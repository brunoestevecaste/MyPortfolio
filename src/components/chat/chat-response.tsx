type TextBlock = { type: "paragraph"; text: string };
type ListBlock = { type: "unordered" | "ordered"; items: { text: string; value?: number }[] };

function blocksFrom(text: string): (TextBlock | ListBlock)[] {
  const blocks: (TextBlock | ListBlock)[] = [];
  let separated = true;
  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    if (!line.trim()) { separated = true; continue; }
    const bullet = /^\s*[-*•]\s+(.+)$/.exec(line);
    const numbered = /^\s*(\d{1,3})[.)]\s+(.+)$/.exec(line);
    const previous = blocks.at(-1);
    if (bullet || numbered) {
      const type = numbered ? "ordered" : "unordered";
      const item = { text: numbered ? numbered[2] : bullet![1], ...(numbered ? { value: Number(numbered[1]) } : {}) };
      if (!separated && previous?.type === type) previous.items.push(item);
      else blocks.push({ type, items: [item] });
    } else if (!separated && previous?.type === "paragraph") {
      previous.text += `\n${line}`;
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
    separated = false;
  }
  return blocks;
}

function emphasis(text: string) {
  // Only completed bold markers become elements. Partial markers stay readable
  // during text reveal; all content remains escaped by React, including HTML.
  return text.split(/(\*\*[^*\n]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  );
}

export function ChatResponse({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {blocksFrom(text).map((block, index) => {
        if (block.type === "paragraph") return <p key={index}>{emphasis(block.text)}</p>;
        const items = block.items.map((item, itemIndex) => <li key={itemIndex} value={item.value}>{emphasis(item.text)}</li>);
        return block.type === "ordered"
          ? <ol key={index} start={block.items[0]?.value}>{items}</ol>
          : <ul key={index}>{items}</ul>;
      })}
    </div>
  );
}
