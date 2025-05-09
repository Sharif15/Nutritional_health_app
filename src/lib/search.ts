export async function searchItems(query: string, type: 'exercise' | 'food') {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.error || 'Search failed');
    }
  
    return data;
  }