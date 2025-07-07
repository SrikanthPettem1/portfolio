async function getStatus() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyXOIjjYwgGqZBGjP5likcisV_tVIrnDpIe4HceYfVZUUMD98LANGUzwuFvFJ2LYKVD/exec');
  const { status } = await res.json();
  console.log(status);
}

async function updateStatus(newStatus) {
  await fetch('https://script.google.com/macros/s/AKfycbyXOIjjYwgGqZBGjP5likcisV_tVIrnDpIe4HceYfVZUUMD98LANGUzwuFvFJ2LYKVD/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  console.log('Updated to', newStatus);
}
