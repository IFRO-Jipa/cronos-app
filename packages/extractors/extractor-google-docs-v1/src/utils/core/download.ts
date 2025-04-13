export async function download(url: string, id: string) {
  console.log("[debug] attempting to download", { url, id });
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return arrayBuffer;
}
