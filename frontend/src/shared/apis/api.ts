export async function saveMarkdown(filename: string, content: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content })
  });
  if (!res.ok) throw new Error('保存に失敗しました');
  return res.json();
} 