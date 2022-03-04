let quotes = [];

fetch('http://localhost:3000/quotes?_embed=likes', {
  headers: { 'Content-Type': 'application/json' },
})
  .then((res) => res.json())
  .then((data) => quotes.push(data));

console.log(quotes[0]);
