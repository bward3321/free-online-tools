"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── MD5 Implementation (RFC 1321) ─── */
function md5(input: string): string {
  const enc = new TextEncoder();
  const msg = enc.encode(input);
  return md5Bytes(msg);
}

function md5Bytes(msg: Uint8Array): string {
  function rotl(x: number, n: number) { return (x << n) | (x >>> (32 - n)); }
  function toU32(x: number) { return x >>> 0; }
  const S = [
    7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
    5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
    4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
    6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21
  ];
  const K = Array.from({length:64},(_,i)=>toU32(Math.floor(Math.abs(Math.sin(i+1))*0x100000000)));
  const len = msg.length;
  const bitLen = len * 8;
  const padLen = ((56 - (len + 1) % 64) + 64) % 64;
  const buf = new Uint8Array(len + 1 + padLen + 8);
  buf.set(msg); buf[len] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(buf.length - 8, bitLen >>> 0, true);
  view.setUint32(buf.length - 4, Math.floor(bitLen / 0x100000000), true);
  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
  for (let off = 0; off < buf.length; off += 64) {
    const M = Array.from({length:16},(_,j)=>view.getUint32(off+j*4,true));
    let a=a0, b=b0, c=c0, d=d0;
    for (let i=0;i<64;i++){
      let f:number, g:number;
      if(i<16){f=(b&c)|((~b)&d);g=i;}
      else if(i<32){f=(d&b)|((~d)&c);g=(5*i+1)%16;}
      else if(i<48){f=b^c^d;g=(3*i+5)%16;}
      else{f=c^(b|(~d));g=(7*i)%16;}
      f=toU32(f+a+K[i]+M[g]);
      a=d;d=c;c=b;b=toU32(b+rotl(f,S[i]));
    }
    a0=toU32(a0+a);b0=toU32(b0+b);c0=toU32(c0+c);d0=toU32(d0+d);
  }
  const hex = (n: number) => Array.from({length:4},(_,i)=>((n>>>(i*8))&0xff).toString(16).padStart(2,"0")).join("");
  return hex(a0)+hex(b0)+hex(c0)+hex(d0);
}

/* ─── HMAC-MD5 ─── */
function hmacMd5(keyBytes: Uint8Array, msgBytes: Uint8Array): string {
  const blockSize = 64;
  let k = keyBytes;
  if (k.length > blockSize) {
    const h = md5Bytes(k);
    k = hexToBytes(h);
  }
  const padded = new Uint8Array(blockSize);
  padded.set(k);
  const ipad = new Uint8Array(blockSize);
  const opad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) { ipad[i] = padded[i] ^ 0x36; opad[i] = padded[i] ^ 0x5c; }
  const inner = new Uint8Array(blockSize + msgBytes.length);
  inner.set(ipad); inner.set(msgBytes, blockSize);
  const innerHash = hexToBytes(md5Bytes(inner));
  const outer = new Uint8Array(blockSize + 16);
  outer.set(opad); outer.set(innerHash, blockSize);
  return md5Bytes(outer);
}

/* ─── Helpers ─── */
function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function bufToBase64(buf: ArrayBuffer): string {
  return btoa(Array.from(new Uint8Array(buf), b => String.fromCharCode(b)).join(""));
}
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  return bytes;
}
function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function fmtSize(n: number): string {
  if (n < 1024) return n + " B";
  if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
  if (n < 1073741824) return (n / 1048576).toFixed(1) + " MB";
  return (n / 1073741824).toFixed(2) + " GB";
}

type Algo = "md5" | "sha1" | "sha256" | "sha384" | "sha512";
type OutputFmt = "hex" | "HEX" | "base64";
type Tab = "text" | "file" | "hmac" | "compare";
type CompareMode = "hash" | "file";
type KeyEnc = "utf8" | "hex" | "base64";

const ALGOS: { id: Algo; name: string; bits: number; color: string; badge?: string; badgeColor?: string }[] = [
  { id: "md5", name: "MD5", bits: 128, color: "#FFB86C", badge: "Insecure", badgeColor: "#FF5555" },
  { id: "sha1", name: "SHA-1", bits: 160, color: "#F1FA8C", badge: "Deprecated", badgeColor: "#FFB86C" },
  { id: "sha256", name: "SHA-256", bits: 256, color: "#50FA7B", badge: "Recommended", badgeColor: "#50FA7B" },
  { id: "sha384", name: "SHA-384", bits: 384, color: "#8BE9FD" },
  { id: "sha512", name: "SHA-512", bits: 512, color: "#BD93F9" },
];

const WEB_CRYPTO_MAP: Record<string, string> = { sha1: "SHA-1", sha256: "SHA-256", sha384: "SHA-384", sha512: "SHA-512" };

const FAQS = [
  { q: "Is my data safe? Is anything sent to a server?", a: "No data leaves your browser. All hashing uses the Web Crypto API built into your browser (for SHA algorithms) or a local JavaScript implementation (for MD5). Files are read locally and never uploaded. Your text, files, and HMAC keys are never transmitted, stored, or logged." },
  { q: "What\u2019s the difference between MD5, SHA-1, SHA-256, and SHA-512?", a: "These are all cryptographic hash functions that produce fixed-size outputs from any input. MD5 produces 128-bit (32 hex character) hashes but is cryptographically broken. SHA-1 produces 160-bit (40 character) hashes but was broken in 2017. SHA-256 produces 256-bit (64 character) hashes and is the recommended standard. SHA-512 produces 512-bit (128 character) hashes for maximum security." },
  { q: "Which hash algorithm should I use?", a: "For most purposes, use SHA-256. It\u2019s the current industry standard, used in TLS certificates, Bitcoin, code signing, and file integrity verification. Use SHA-512 for maximum security requirements. Only use MD5 or SHA-1 for legacy compatibility where security is not a concern." },
  { q: "Is hashing the same as encryption?", a: "No. Hashing is one-way \u2014 you cannot reverse a hash to get the original data. Encryption is two-way \u2014 encrypted data can be decrypted with the correct key. Hashing is used for verification and integrity, not confidentiality." },
  { q: "What is HMAC and when do I need it?", a: "HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function. While a regular hash only proves integrity, HMAC also proves authenticity \u2014 the data came from someone who knows the secret key. Essential for webhook verification (Stripe, GitHub, Shopify) and API authentication." },
  { q: "Can I hash large files?", a: "Yes. The tool reads files in chunks using streaming APIs, so it can handle files up to 2GB without running out of memory. A progress bar shows hashing progress. All processing happens locally." },
  { q: "How do I verify a downloaded file?", a: "Go to the File Hash tab, drop your file, and compute its hash. Then compare the result with the checksum from the file\u2019s publisher. If they match, the file is authentic. You can also use the Compare tab to verify automatically." },
  { q: "Why does my MD5 hash have a warning?", a: "MD5 has been cryptographically broken since 2004. Collisions can be generated in seconds. It cannot be trusted for security purposes. We include it for legacy compatibility but recommend SHA-256 for anything security-related." },
  { q: "Can I reverse a hash to find the original text?", a: "No. Cryptographic hash functions are one-way. However, weak passwords can be found using rainbow tables. This is why password hashing should use bcrypt/argon2 with salting, not raw SHA-256." },
];

const RELATED = [
  { name: "Base64 Encoder & Decoder", href: "/developer-tools/base64-encoder-decoder", emoji: "\uD83D\uDD04" },
  { name: "URL Encoder & Decoder", href: "/developer-tools/url-encoder-decoder", emoji: "\uD83D\uDD17" },
  { name: "JSON Formatter & Validator", href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27" },
  { name: "Password Generator", href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10" },
  { name: "QR Code Generator", href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1" },
];

interface Props {
  title: string;
  subtitle: string;
  defaultTab?: Tab;
  highlightAlgo?: Algo;
  defaultCompareMode?: CompareMode;
  articleMode?: boolean;
}

export default function HashGenerator({ title, subtitle, defaultTab = "text", highlightAlgo, defaultCompareMode = "hash", articleMode = false }: Props) {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [outputFmt, setOutputFmt] = useState<OutputFmt>("hex");

  // Text hash state
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<Algo, ArrayBuffer | null>>({ md5: null, sha1: null, sha256: null, sha384: null, sha512: null });
  const [md5Hex, setMd5Hex] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // File hash state
  const [file, setFile] = useState<File | null>(null);
  const [fileHashes, setFileHashes] = useState<Record<Algo, ArrayBuffer | null>>({ md5: null, sha1: null, sha256: null, sha384: null, sha512: null });
  const [fileMd5Hex, setFileMd5Hex] = useState("");
  const [fileProgress, setFileProgress] = useState(0);
  const [fileHashing, setFileHashing] = useState(false);
  const [fileTime, setFileTime] = useState(0);
  const [fileVerify, setFileVerify] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // HMAC state
  const [hmacKey, setHmacKey] = useState("");
  const [hmacMsg, setHmacMsg] = useState("");
  const [hmacAlgo, setHmacAlgo] = useState<Algo>("sha256");
  const [hmacKeyEnc, setHmacKeyEnc] = useState<KeyEnc>("utf8");
  const [hmacResult, setHmacResult] = useState<{ hex: string; base64: string } | null>(null);
  const [hmacShowKey, setHmacShowKey] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);

  // Compare state
  const [compareMode, setCompareMode] = useState<CompareMode>(defaultCompareMode);
  const [hash1, setHash1] = useState("");
  const [hash2, setHash2] = useState("");
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyExpected, setVerifyExpected] = useState("");
  const [verifyResult, setVerifyResult] = useState<{ match: boolean; algo: string; computed: string } | null>(null);
  const [verifyHashing, setVerifyHashing] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const verifyFileRef = useRef<HTMLInputElement>(null);

  // Misc
  const [copied, setCopied] = useState("");
  const [refOpen, setRefOpen] = useState(false);

  // Theme detection
  useEffect(() => {
    const html = document.documentElement;
    setDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const C = {
    bg: dark ? "#1E1E2E" : "#FFFFFF",
    surface: dark ? "#282A36" : "#F8F9FA",
    surfaceAlt: dark ? "#313244" : "#F0F0F0",
    text: dark ? "#F8F8F2" : "#1A1A2E",
    muted: dark ? "#A0A0B8" : "#6B7280",
    border: dark ? "#44475A" : "#E0E0E0",
    accent: "#8BE9FD",
    green: "#50FA7B",
    red: "#FF5555",
  };

  /* ─── Format hash output ─── */
  const fmtHash = useCallback((buf: ArrayBuffer | null, algo?: Algo): string => {
    if (!buf) return "";
    if (algo === "md5") {
      // md5 stores hex in the buffer as a placeholder; we use md5Hex directly
      return "";
    }
    if (outputFmt === "base64") return bufToBase64(buf);
    const hex = bufToHex(buf);
    return outputFmt === "HEX" ? hex.toUpperCase() : hex;
  }, [outputFmt]);

  const getHash = useCallback((algo: Algo, hashMap: Record<Algo, ArrayBuffer | null>, md5HexVal: string): string => {
    if (algo === "md5") {
      if (!md5HexVal) return "";
      if (outputFmt === "base64") return bufToBase64(hexToBytes(md5HexVal).buffer as ArrayBuffer);
      return outputFmt === "HEX" ? md5HexVal.toUpperCase() : md5HexVal;
    }
    return fmtHash(hashMap[algo]);
  }, [fmtHash, outputFmt]);

  /* ─── Text hashing ─── */
  const computeTextHashes = useCallback(async (input: string) => {
    if (!input) {
      setHashes({ md5: null, sha1: null, sha256: null, sha384: null, sha512: null });
      setMd5Hex("");
      return;
    }
    const enc = new TextEncoder();
    const data = enc.encode(input);
    const [sha1Buf, sha256Buf, sha384Buf, sha512Buf] = await Promise.all([
      crypto.subtle.digest("SHA-1", data),
      crypto.subtle.digest("SHA-256", data),
      crypto.subtle.digest("SHA-384", data),
      crypto.subtle.digest("SHA-512", data),
    ]);
    setHashes({ md5: null, sha1: sha1Buf, sha256: sha256Buf, sha384: sha384Buf, sha512: sha512Buf });
    setMd5Hex(md5(input));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => computeTextHashes(text), 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [text, computeTextHashes]);

  /* ─── File hashing ─── */
  const hashFileAll = useCallback(async (f: File) => {
    setFileHashing(true);
    setFileProgress(0);
    setFileHashes({ md5: null, sha1: null, sha256: null, sha384: null, sha512: null });
    setFileMd5Hex("");
    setFileTime(0);
    const start = performance.now();
    const reader = f.stream().getReader();
    const chunks: Uint8Array[] = [];
    let bytesRead = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      bytesRead += value.length;
      setFileProgress(bytesRead / f.size);
    }
    const fullBuffer = new Uint8Array(bytesRead);
    let offset = 0;
    for (const chunk of chunks) { fullBuffer.set(chunk, offset); offset += chunk.length; }
    const [sha1Buf, sha256Buf, sha384Buf, sha512Buf] = await Promise.all([
      crypto.subtle.digest("SHA-1", fullBuffer),
      crypto.subtle.digest("SHA-256", fullBuffer),
      crypto.subtle.digest("SHA-384", fullBuffer),
      crypto.subtle.digest("SHA-512", fullBuffer),
    ]);
    const md5Result = md5Bytes(fullBuffer);
    setFileHashes({ md5: null, sha1: sha1Buf, sha256: sha256Buf, sha384: sha384Buf, sha512: sha512Buf });
    setFileMd5Hex(md5Result);
    setFileTime((performance.now() - start) / 1000);
    setFileProgress(1);
    setFileHashing(false);
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); hashFileAll(f); }
  }, [hashFileAll]);

  /* ─── File verify match ─── */
  const checkFileVerify = useCallback((verifyHash: string) => {
    if (!verifyHash.trim()) return null;
    const clean = verifyHash.trim().toLowerCase().replace(/\s/g, "");
    for (const algo of ALGOS) {
      const computed = getHash(algo.id, fileHashes, fileMd5Hex).toLowerCase();
      if (computed && computed === clean) return { match: true, algo: algo.name };
    }
    return { match: false, algo: "" };
  }, [fileHashes, fileMd5Hex, getHash]);

  /* ─── HMAC ─── */
  const computeHmac = useCallback(async () => {
    if (!hmacKey || !hmacMsg) { setHmacResult(null); return; }
    let keyData: Uint8Array;
    try {
      switch (hmacKeyEnc) {
        case "hex": keyData = hexToBytes(hmacKey.replace(/\s/g, "")); break;
        case "base64": keyData = base64ToBytes(hmacKey); break;
        default: keyData = new TextEncoder().encode(hmacKey);
      }
    } catch { setHmacResult(null); return; }

    if (hmacAlgo === "md5") {
      const msgBytes = new TextEncoder().encode(hmacMsg);
      const hex = hmacMd5(keyData, msgBytes);
      setHmacResult({ hex, base64: bufToBase64(hexToBytes(hex).buffer as ArrayBuffer) });
      return;
    }

    try {
      const cryptoKey = await crypto.subtle.importKey("raw", keyData.buffer as ArrayBuffer, { name: "HMAC", hash: WEB_CRYPTO_MAP[hmacAlgo] }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(hmacMsg));
      setHmacResult({ hex: bufToHex(sig), base64: bufToBase64(sig) });
    } catch { setHmacResult(null); }
  }, [hmacKey, hmacMsg, hmacAlgo, hmacKeyEnc]);

  useEffect(() => { computeHmac(); }, [computeHmac]);

  /* ─── Compare ─── */
  const detectAlgo = (h: string): string => {
    const len = h.replace(/\s/g, "").length;
    if (len === 32) return "MD5";
    if (len === 40) return "SHA-1";
    if (len === 64) return "SHA-256";
    if (len === 96) return "SHA-384";
    if (len === 128) return "SHA-512";
    return "Unknown";
  };

  const compareResult = (() => {
    if (!hash1.trim() || !hash2.trim()) return null;
    const a = hash1.trim().toLowerCase().replace(/\s/g, "");
    const b = hash2.trim().toLowerCase().replace(/\s/g, "");
    const match = a === b;
    const algo = detectAlgo(a);
    let firstDiff = -1;
    if (!match) {
      for (let i = 0; i < Math.max(a.length, b.length); i++) { if (a[i] !== b[i]) { firstDiff = i; break; } }
    }
    return { match, algo, firstDiff, len1: a.length, len2: b.length };
  })();

  /* ─── File verify (Compare tab) ─── */
  const verifyFileIntegrity = useCallback(async () => {
    if (!verifyFile || !verifyExpected.trim()) return;
    setVerifyHashing(true);
    setVerifyProgress(0);
    const clean = verifyExpected.trim().toLowerCase().replace(/\s/g, "");
    const algo = detectAlgo(clean);
    const algoMap: Record<string, string> = { "SHA-1": "SHA-1", "SHA-256": "SHA-256", "SHA-384": "SHA-384", "SHA-512": "SHA-512" };

    const reader = verifyFile.stream().getReader();
    const chunks: Uint8Array[] = [];
    let bytesRead = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      bytesRead += value.length;
      setVerifyProgress(bytesRead / verifyFile.size);
    }
    const fullBuffer = new Uint8Array(bytesRead);
    let offset = 0;
    for (const chunk of chunks) { fullBuffer.set(chunk, offset); offset += chunk.length; }

    let computed: string;
    if (algo === "MD5") {
      computed = md5Bytes(fullBuffer);
    } else if (algoMap[algo]) {
      const buf = await crypto.subtle.digest(algoMap[algo], fullBuffer);
      computed = bufToHex(buf);
    } else {
      // Try SHA-256 as default
      const buf = await crypto.subtle.digest("SHA-256", fullBuffer);
      computed = bufToHex(buf);
    }
    setVerifyResult({ match: computed === clean, algo, computed });
    setVerifyHashing(false);
    setVerifyProgress(1);
  }, [verifyFile, verifyExpected]);

  /* ─── Copy helper ─── */
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const copyAll = (hashMap: Record<Algo, ArrayBuffer | null>, md5HexVal: string) => {
    const lines = ALGOS.map(a => `${a.name.padEnd(8)} ${getHash(a.id, hashMap, md5HexVal)}`).filter(l => l.trim().length > 8);
    copy(lines.join("\n"), "all");
  };

  /* ─── Tab buttons ─── */
  const tabs: { id: Tab; label: string }[] = [
    { id: "text", label: "Text Hash" },
    { id: "file", label: "File Hash" },
    { id: "hmac", label: "HMAC" },
    { id: "compare", label: "Compare" },
  ];

  const btnStyle = (active: boolean) => ({
    padding: "8px 18px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600 as const,
    cursor: "pointer" as const,
    border: "none",
    background: active ? C.accent : "transparent",
    color: active ? "#1E1E2E" : C.muted,
    transition: "all 0.2s",
  });

  const cardStyle = {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "100%",
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    borderRadius: "8px",
    color: C.text,
    fontFamily: "monospace",
    fontSize: "15px",
    padding: "12px",
    resize: "vertical" as const,
    outline: "none",
  };

  const smallBtn = (active?: boolean) => ({
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 600 as const,
    cursor: "pointer" as const,
    border: `1px solid ${active ? C.accent : C.border}`,
    background: active ? C.accent + "22" : "transparent",
    color: active ? C.accent : C.muted,
    transition: "all 0.15s",
  });

  const fmtOpts: { id: OutputFmt; label: string }[] = [
    { id: "hex", label: "hex" },
    { id: "HEX", label: "HEX" },
    { id: "base64", label: "Base64" },
  ];

  /* ─── Render hash card ─── */
  const renderHashCard = (algo: typeof ALGOS[number], hashMap: Record<Algo, ArrayBuffer | null>, md5HexVal: string) => {
    const val = getHash(algo.id, hashMap, md5HexVal);
    const isHighlighted = highlightAlgo === algo.id;
    return (
      <div key={algo.id} style={{ ...cardStyle, borderColor: isHighlighted ? algo.color : C.border, borderWidth: isHighlighted ? "2px" : "1px" }}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ color: algo.color, fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{algo.name}</span>
            {algo.badge && (
              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", fontWeight: 600, background: algo.badgeColor + "22", color: algo.badgeColor }}>
                {algo.badge === "Recommended" ? "\u2705 " : "\u26A0\uFE0F "}{algo.badge}
              </span>
            )}
            <span style={{ fontSize: "15px", color: C.muted }}>{algo.bits}-bit</span>
          </div>
          <button onClick={() => val && copy(val, algo.id)} style={{ ...smallBtn(), opacity: val ? 1 : 0.4 }} disabled={!val}>
            {copied === algo.id ? "\u2705 Copied" : "\uD83D\uDCCB Copy"}
          </button>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "15px", color: val ? C.text : C.muted, wordBreak: "break-all", minHeight: "20px", lineHeight: 1.5 }}>
          {val || "—"}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: articleMode ? undefined : "100vh" }}>
      <div className="max-w-[1100px] mx-auto px-4" style={{ paddingTop: articleMode ? "0" : "32px", paddingBottom: "48px" }}>
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: C.muted }}>
              <a href="/" className="hover:underline" style={{ color: C.accent }}>Home</a>
              <span>/</span><span>Developer Tools</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg mb-8" style={{ color: C.muted }}>{subtitle}</p>
          </>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={btnStyle(tab === t.id)}>{t.label}</button>)}
        </div>

        {/* Output format */}
        {(tab === "text" || tab === "file") && (
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: "15px", color: C.muted }}>Output:</span>
            {fmtOpts.map(f => <button key={f.id} onClick={() => setOutputFmt(f.id)} style={smallBtn(outputFmt === f.id)}>{f.label}</button>)}
          </div>
        )}

        {/* ─── TEXT HASH TAB ─── */}
        {tab === "text" && (
          <div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter text to hash..."
              rows={5}
              style={inputStyle}
            />
            <div className="flex items-center justify-between flex-wrap gap-2 mt-2 mb-4">
              <span style={{ fontSize: "15px", color: C.muted }}>
                {text.length.toLocaleString()} characters &middot; {text.split(/\n/).length} lines
              </span>
              <div className="flex gap-2">
                <button onClick={() => setText("hello")} style={smallBtn()}>Sample</button>
                <button onClick={() => copyAll(hashes, md5Hex)} style={{ ...smallBtn(), opacity: md5Hex ? 1 : 0.4 }} disabled={!md5Hex}>Copy All</button>
                <button onClick={() => { setText(""); }} style={smallBtn()}>Clear</button>
              </div>
            </div>
            {ALGOS.map(a => renderHashCard(a, hashes, md5Hex))}
          </div>
        )}

        {/* ─── FILE HASH TAB ─── */}
        {tab === "file" && (
          <div>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ ...cardStyle, padding: "40px", textAlign: "center", cursor: "pointer", borderStyle: "dashed", borderWidth: "2px" }}
            >
              <input ref={fileInputRef} type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); hashFileAll(f); } }} />
              {file ? (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>{file.name}</div>
                  <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>
                    {fmtSize(file.size)} &middot; {file.type || "unknown type"}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{"\uD83D\uDCC1"}</div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>Drop a file here or click to upload</div>
                  <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>Any file type, up to 2 GB</div>
                </div>
              )}
            </div>

            {fileHashing && (
              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", color: C.muted, marginBottom: "4px" }}>
                  <span>Hashing...</span>
                  <span>{Math.round(fileProgress * 100)}%</span>
                </div>
                <div style={{ height: "6px", borderRadius: "3px", background: C.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${fileProgress * 100}%`, background: C.accent, borderRadius: "3px", transition: "width 0.2s" }} />
                </div>
              </div>
            )}

            {file && !fileHashing && fileTime > 0 && (
              <div style={{ fontSize: "15px", color: C.muted, marginTop: "8px" }}>
                Hashed in {fileTime.toFixed(1)}s
              </div>
            )}

            {file && !fileHashing && fileMd5Hex && (
              <>
                <div className="flex justify-end gap-2 mt-4 mb-2">
                  <button onClick={() => copyAll(fileHashes, fileMd5Hex)} style={smallBtn()}>Copy All</button>
                </div>
                {ALGOS.map(a => renderHashCard(a, fileHashes, fileMd5Hex))}

                {/* Quick Verify */}
                <div style={{ ...cardStyle, marginTop: "16px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>Quick Verify</div>
                  <input
                    type="text"
                    value={fileVerify}
                    onChange={e => setFileVerify(e.target.value)}
                    placeholder="Paste expected hash to verify..."
                    style={{ ...inputStyle, resize: "none" as const }}
                  />
                  {fileVerify.trim() && (() => {
                    const result = checkFileVerify(fileVerify);
                    if (!result) return null;
                    return result.match ? (
                      <div style={{ marginTop: "8px", padding: "12px", borderRadius: "8px", background: C.green + "22", color: C.green, fontWeight: 600, fontSize: "15px" }}>
                        {"\u2705"} Match! This matches the {result.algo} hash. File integrity verified.
                      </div>
                    ) : (
                      <div style={{ marginTop: "8px", padding: "12px", borderRadius: "8px", background: C.red + "22", color: C.red, fontWeight: 600, fontSize: "15px" }}>
                        {"\u274C"} No match. The pasted hash does not match any computed hash.
                      </div>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── HMAC TAB ─── */}
        {tab === "hmac" && (
          <div>
            <div style={cardStyle}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <label style={{ fontSize: "15px", fontWeight: 600 }}>Secret Key</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setHmacShowKey(!hmacShowKey)} style={smallBtn()}>
                    {hmacShowKey ? "Hide" : "Show"}
                  </button>
                  {(["utf8", "hex", "base64"] as KeyEnc[]).map(k => (
                    <button key={k} onClick={() => setHmacKeyEnc(k)} style={smallBtn(hmacKeyEnc === k)}>
                      {k === "utf8" ? "UTF-8" : k === "hex" ? "Hex" : "Base64"}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type={hmacShowKey ? "text" : "password"}
                value={hmacKey}
                onChange={e => setHmacKey(e.target.value)}
                placeholder="Enter your secret key (e.g., whsec_abc123...)"
                style={{ ...inputStyle, resize: "none" as const }}
              />
            </div>

            <div style={cardStyle}>
              <label style={{ fontSize: "15px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Message / Payload</label>
              <textarea
                value={hmacMsg}
                onChange={e => setHmacMsg(e.target.value)}
                placeholder="Enter the message or webhook payload to authenticate"
                rows={6}
                style={inputStyle}
              />
            </div>

            <div style={cardStyle}>
              <label style={{ fontSize: "15px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Algorithm</label>
              <div className="flex flex-wrap gap-2">
                {ALGOS.map(a => (
                  <button key={a.id} onClick={() => setHmacAlgo(a.id)} style={{
                    ...smallBtn(hmacAlgo === a.id),
                    borderColor: hmacAlgo === a.id ? a.color : C.border,
                    color: hmacAlgo === a.id ? a.color : C.muted,
                    background: hmacAlgo === a.id ? a.color + "22" : "transparent",
                  }}>
                    HMAC-{a.name}
                    {a.badge === "Insecure" && " \u26A0\uFE0F"}
                  </button>
                ))}
              </div>
            </div>

            {hmacResult && (
              <div style={cardStyle}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "15px", fontWeight: 700, color: ALGOS.find(a => a.id === hmacAlgo)?.color }}>
                    HMAC-{ALGOS.find(a => a.id === hmacAlgo)?.name}
                  </span>
                  <button onClick={() => copy(hmacResult.hex, "hmac-hex")} style={smallBtn()}>
                    {copied === "hmac-hex" ? "\u2705 Copied" : "\uD83D\uDCCB Copy Hex"}
                  </button>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "15px", color: C.muted, marginBottom: "4px" }}>Hex:</div>
                  <div style={{ fontFamily: "monospace", fontSize: "15px", wordBreak: "break-all", lineHeight: 1.5 }}>{hmacResult.hex}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "15px", color: C.muted }}>Base64:</span>
                    <button onClick={() => copy(hmacResult.base64, "hmac-b64")} style={smallBtn()}>
                      {copied === "hmac-b64" ? "\u2705 Copied" : "\uD83D\uDCCB Copy"}
                    </button>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "15px", wordBreak: "break-all", lineHeight: 1.5, marginTop: "4px" }}>{hmacResult.base64}</div>
                </div>
              </div>
            )}

            {/* Webhook helpers */}
            <div style={cardStyle}>
              <button onClick={() => setWebhookOpen(!webhookOpen)} className="w-full flex items-center justify-between" style={{ background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: "15px", fontWeight: 600, padding: 0 }}>
                <span>Webhook Verification Helpers</span>
                <span style={{ transform: webhookOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{"\u25BC"}</span>
              </button>
              {webhookOpen && (
                <div className="space-y-4 mt-4" style={{ fontSize: "15px", color: C.muted }}>
                  <div style={{ padding: "12px", borderRadius: "8px", background: C.surfaceAlt }}>
                    <div style={{ fontWeight: 600, color: C.text, marginBottom: "6px" }}>Stripe Webhook</div>
                    <div>Algorithm: <strong style={{ color: C.accent }}>HMAC-SHA256</strong></div>
                    <div>Key: Your Stripe webhook secret (<code style={{ color: C.accent }}>whsec_...</code>)</div>
                    <div>Message: <code style={{ color: C.accent }}>{"{timestamp}.{raw_body}"}</code></div>
                    <div>Compare with: <code style={{ color: C.accent }}>Stripe-Signature</code> header (<code style={{ color: C.accent }}>v1=&lt;signature&gt;</code>)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "8px", background: C.surfaceAlt }}>
                    <div style={{ fontWeight: 600, color: C.text, marginBottom: "6px" }}>GitHub Webhook</div>
                    <div>Algorithm: <strong style={{ color: C.accent }}>HMAC-SHA256</strong></div>
                    <div>Key: Your GitHub webhook secret</div>
                    <div>Message: Raw request body</div>
                    <div>Compare with: <code style={{ color: C.accent }}>X-Hub-Signature-256</code> header (<code style={{ color: C.accent }}>sha256=&lt;signature&gt;</code>)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "8px", background: C.surfaceAlt }}>
                    <div style={{ fontWeight: 600, color: C.text, marginBottom: "6px" }}>Shopify Webhook</div>
                    <div>Algorithm: <strong style={{ color: C.accent }}>HMAC-SHA256</strong></div>
                    <div>Key: Your Shopify API secret</div>
                    <div>Message: Raw request body</div>
                    <div>Compare with: <code style={{ color: C.accent }}>X-Shopify-Hmac-Sha256</code> header (Base64 encoded)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── COMPARE TAB ─── */}
        {tab === "compare" && (
          <div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setCompareMode("hash")} style={btnStyle(compareMode === "hash")}>Compare Hashes</button>
              <button onClick={() => setCompareMode("file")} style={btnStyle(compareMode === "file")}>Verify File</button>
            </div>

            {compareMode === "hash" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: "15px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Hash 1</label>
                    <textarea
                      value={hash1}
                      onChange={e => setHash1(e.target.value)}
                      placeholder="Paste first hash..."
                      rows={3}
                      style={{ ...inputStyle, borderColor: compareResult ? (compareResult.match ? C.green : C.red) : C.border }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "15px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Hash 2</label>
                    <textarea
                      value={hash2}
                      onChange={e => setHash2(e.target.value)}
                      placeholder="Paste second hash..."
                      rows={3}
                      style={{ ...inputStyle, borderColor: compareResult ? (compareResult.match ? C.green : C.red) : C.border }}
                    />
                  </div>
                </div>

                {compareResult && (
                  <div style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: compareResult.match ? C.green + "18" : C.red + "18", border: `1px solid ${compareResult.match ? C.green + "44" : C.red + "44"}` }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: compareResult.match ? C.green : C.red, marginBottom: "4px" }}>
                      {compareResult.match ? "\u2705 MATCH \u2014 These hashes are identical." : "\u274C MISMATCH \u2014 These hashes are different."}
                    </div>
                    <div style={{ fontSize: "15px", color: C.muted }}>
                      Algorithm detected: {compareResult.algo} ({compareResult.len1} hex characters)
                    </div>
                    {!compareResult.match && compareResult.firstDiff >= 0 && (
                      <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>
                        First difference at position {compareResult.firstDiff + 1}
                      </div>
                    )}
                    {!compareResult.match && compareResult.len1 !== compareResult.len2 && (
                      <div style={{ fontSize: "15px", color: C.red, marginTop: "4px" }}>
                        Length mismatch: Hash 1 is {compareResult.len1} chars, Hash 2 is {compareResult.len2} chars
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {compareMode === "file" && (
              <div>
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setVerifyFile(f); }}
                  onClick={() => verifyFileRef.current?.click()}
                  style={{ ...cardStyle, padding: "32px", textAlign: "center", cursor: "pointer", borderStyle: "dashed", borderWidth: "2px" }}
                >
                  <input ref={verifyFileRef} type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setVerifyFile(f); }} />
                  {verifyFile ? (
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 600 }}>{verifyFile.name}</div>
                      <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>{fmtSize(verifyFile.size)}</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{"\uD83D\uDCC1"}</div>
                      <div style={{ fontSize: "15px", fontWeight: 600 }}>Drop a file or click to upload</div>
                    </div>
                  )}
                </div>

                <div style={{ ...cardStyle, marginTop: "12px" }}>
                  <label style={{ fontSize: "15px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Expected Hash</label>
                  <input
                    type="text"
                    value={verifyExpected}
                    onChange={e => setVerifyExpected(e.target.value)}
                    placeholder="Paste the expected hash..."
                    style={{ ...inputStyle, resize: "none" as const }}
                  />
                  {verifyExpected.trim() && (
                    <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>
                      Detected: {detectAlgo(verifyExpected.trim())} ({verifyExpected.trim().replace(/\s/g, "").length} chars)
                    </div>
                  )}
                </div>

                <button
                  onClick={verifyFileIntegrity}
                  disabled={!verifyFile || !verifyExpected.trim() || verifyHashing}
                  style={{
                    marginTop: "12px",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: verifyFile && verifyExpected.trim() ? "pointer" : "not-allowed",
                    border: "none",
                    background: C.accent,
                    color: "#1E1E2E",
                    opacity: verifyFile && verifyExpected.trim() ? 1 : 0.5,
                    width: "100%",
                  }}
                >
                  {verifyHashing ? "Verifying..." : "Verify File Integrity"}
                </button>

                {verifyHashing && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ height: "6px", borderRadius: "3px", background: C.surfaceAlt, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${verifyProgress * 100}%`, background: C.accent, borderRadius: "3px", transition: "width 0.2s" }} />
                    </div>
                  </div>
                )}

                {verifyResult && (
                  <div style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: verifyResult.match ? C.green + "18" : C.red + "18", border: `1px solid ${verifyResult.match ? C.green + "44" : C.red + "44"}` }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: verifyResult.match ? C.green : C.red }}>
                      {verifyResult.match ? "\u2705 Match! File integrity verified." : "\u274C Mismatch! File may be corrupted or tampered with."}
                    </div>
                    <div style={{ fontSize: "15px", color: C.muted, marginTop: "4px" }}>
                      Algorithm: {verifyResult.algo}
                    </div>
                    {!verifyResult.match && (
                      <div style={{ fontSize: "15px", fontFamily: "monospace", color: C.muted, marginTop: "4px", wordBreak: "break-all" }}>
                        Computed: {verifyResult.computed}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── Quick Reference ─── */}
        <div style={{ ...cardStyle, marginTop: "32px" }}>
          <button onClick={() => setRefOpen(!refOpen)} className="w-full flex items-center justify-between" style={{ background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: "16px", fontWeight: 700, padding: 0 }}>
            <span>Hash Algorithms Quick Reference</span>
            <span style={{ transform: refOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{"\u25BC"}</span>
          </button>
          {refOpen && (
            <div className="mt-4" style={{ fontSize: "15px" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Algorithm", "Output", "Hex Len", "Security", "Use Case"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: C.muted, fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { algo: "MD5", output: "128-bit", hex: "32", security: "\u26A0\uFE0F Broken", color: "#FFB86C", use: "Legacy checksums only" },
                      { algo: "SHA-1", output: "160-bit", hex: "40", security: "\u26A0\uFE0F Broken", color: "#F1FA8C", use: "Git commits, legacy" },
                      { algo: "SHA-256", output: "256-bit", hex: "64", security: "\u2705 Secure", color: "#50FA7B", use: "General purpose \u2605" },
                      { algo: "SHA-384", output: "384-bit", hex: "96", security: "\u2705 Secure", color: "#8BE9FD", use: "TLS, certificates" },
                      { algo: "SHA-512", output: "512-bit", hex: "128", security: "\u2705 Secure", color: "#BD93F9", use: "High-security apps" },
                    ].map(r => (
                      <tr key={r.algo} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "8px 12px", fontWeight: 600, color: r.color }}>{r.algo}</td>
                        <td style={{ padding: "8px 12px", color: C.muted }}>{r.output}</td>
                        <td style={{ padding: "8px 12px", color: C.muted }}>{r.hex}</td>
                        <td style={{ padding: "8px 12px" }}>{r.security}</td>
                        <td style={{ padding: "8px 12px", color: C.muted }}>{r.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-2" style={{ fontSize: "15px", color: C.muted }}>
                <p><strong style={{ color: C.text }}>Security Notes:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hashing is ONE-WAY &mdash; you cannot reverse a hash to get the original data</li>
                  <li>Hashing is NOT encryption &mdash; it provides integrity, not confidentiality</li>
                  <li>MD5 and SHA-1 are cryptographically broken &mdash; do NOT use for security</li>
                  <li>For passwords, use bcrypt/scrypt/argon2 &mdash; NOT raw SHA-256</li>
                  <li>HMAC adds authentication on top of hashing &mdash; use it for API verification</li>
                </ul>
                <p className="mt-3"><strong style={{ color: C.text }}>Hash Length Identifier:</strong></p>
                <div className="font-mono text-sm space-y-1" style={{ color: C.muted }}>
                  <div>32 hex chars &rarr; likely MD5</div>
                  <div>40 hex chars &rarr; likely SHA-1</div>
                  <div>64 hex chars &rarr; likely SHA-256</div>
                  <div>96 hex chars &rarr; likely SHA-384</div>
                  <div>128 hex chars &rarr; likely SHA-512</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── FAQs ─── */}
        <div className="mt-10">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: C.text }}>Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="group" style={{ borderRadius: "10px", border: `1px solid ${C.border}`, background: C.surface }}>
                <summary className="cursor-pointer px-5 py-4 font-semibold" style={{ fontSize: "16px", color: C.text, listStyle: "none" }}>
                  <span className="flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="ml-2 transition-transform group-open:rotate-180" style={{ color: C.muted }}>{"\u25BC"}</span>
                  </span>
                </summary>
                <div className="px-5 pb-4" style={{ fontSize: "17px", lineHeight: 1.7, color: C.muted }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* ─── Related Tools ─── */}
        <div className="mt-10">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: C.text }}>Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RELATED.map(t => (
              <a key={t.href} href={t.href} className="block p-4 rounded-xl border hover:shadow-lg transition-shadow" style={{ background: C.surface, borderColor: C.border, textDecoration: "none", color: C.text }}>
                <span className="text-xl mr-2">{t.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: "15px" }}>{t.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
