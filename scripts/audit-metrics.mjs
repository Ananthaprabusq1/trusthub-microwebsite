import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("src");
const NEXT_DIR = path.resolve(".next");
const MAX_LINES_PER_FILE = 300;
const isQuick = process.argv.includes("--quick");

function walkFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkFiles(fullPath, fileList);
        } else if (/\.(ts|tsx|css|json)$/.test(entry.name)) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

function getFolderSizeBytes(dir) {
    if (!fs.existsSync(dir)) return 0;
    let total = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            total += getFolderSizeBytes(fullPath);
        } else {
            total += fs.statSync(fullPath).size;
        }
    }
    return total;
}

const files = walkFiles(SRC_DIR);
const fileMetrics = files
    .map((filePath) => {
        const content = fs.readFileSync(filePath, "utf8");
        const lines = content.split("\n").length;
        return {
            file: path.relative(process.cwd(), filePath),
            lines,
            exceeds: lines > MAX_LINES_PER_FILE,
        };
    })
    .sort((a, b) => b.lines - a.lines);

const oversized = fileMetrics.filter((f) => f.exceeds);

if (isQuick) {
    console.log(
        `🔍 Pre-commit File Audit: scanned ${fileMetrics.length} files (limit <= ${MAX_LINES_PER_FILE} lines)`
    );
    if (oversized.length > 0) {
        for (const item of oversized) {
            console.log(`  ⚠️  ${item.file}: ${item.lines} lines (consider splitting)`);
        }
    } else {
        console.log("  ✅ All src/ files within line limit.");
    }
    process.exit(0);
}

const nextSizeMB = (getFolderSizeBytes(NEXT_DIR) / (1024 * 1024)).toFixed(2);

console.log("\n=== TrustHub Code & Build Audit Report ===");
console.log(`Date: ${new Date().toISOString().split("T")[0]}`);
console.log(`Total src files scanned: ${fileMetrics.length}`);
console.log(`.next build folder size: ${nextSizeMB} MB`);
console.log("\nTop 10 Largest Files in src/:");
for (const item of fileMetrics.slice(0, 10)) {
    const flag = item.exceeds ? `⚠️ (> ${MAX_LINES_PER_FILE} lines)` : "✅";
    console.log(`  ${flag} ${item.file}: ${item.lines} lines`);
}

if (oversized.length > 0) {
    console.log(
        `\nAction Needed: ${oversized.length} file(s) exceed ${MAX_LINES_PER_FILE} lines. Refactor using SOLID/DRY.`
    );
} else {
    console.log(`\n✅ All src/ files are within <= ${MAX_LINES_PER_FILE} lines.`);
}

try {
    execSync("pnpm outdated", { stdio: "inherit" });
} catch {
    console.log("ℹ️  Review outdated packages above before major upgrades.");
}