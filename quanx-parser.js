let content = $resource.content;
let lines = content.split(/\r?\n/);
let result = [];

for (let line of lines) {
    line = line.trim();

    if (!line || line.startsWith("#") || line === "payload:") continue;

    line = line.replace(/^-\s*/, "").trim();
    line = line.replace(/^['"]|['"]$/g, "");

    if (!line) continue;

    if (line.startsWith("+.")) {
        result.push("host-suffix," + line.substring(2) + ",proxy");
    } else if (/^[0-9.]+\/\d+$/.test(line)) {
        result.push("ip-cidr," + line + ",proxy");
    } else if (/^[0-9a-fA-F:]+\/\d+$/.test(line)) {
        result.push("ip6-cidr," + line + ",proxy");
    } else {
        result.push("host," + line + ",proxy");
    }
}

$done({
    content: result.join("\n")
});
