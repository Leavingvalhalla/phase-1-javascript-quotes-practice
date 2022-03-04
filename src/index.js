getQuotes();

function getQuotes() {
  fetch('http://localhost:3000/quotes?_embed=likes', {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => renderQuotes(data));
}

function renderQuotes(quotes) {
  quotes.forEach((quote) => {
    const li = document.createElement('li');
    li.className = 'quote-card';

    const block = document.createElement('blockquote');
    block.className = 'blockquote';

    const p = document.createElement('p');
    p.innerText = quote.quote;
    p.className = 'mb-0';
    block.appendChild(p);

    const footer = document.createElement('footer');
    footer.className = 'blockquote-footer';
    footer.innerText = quote.author;
    block.appendChild(footer);

    const lineBreak = document.createElement('br');
    block.appendChild(lineBreak);

    const likesButton = document.createElement('button');
    likesButton.className = 'btn-success';
    likesButton.innerText = `Likes: `;
    likesButton.id = `likes-${quote.id}`;

    const span = document.createElement('span');
    const likeCount = document.createElement('p');

    likeCount.innerText = quote.likes.length;
    span.appendChild(likeCount);
    likesButton.appendChild(span);

    block.appendChild(likesButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'btn-danger';
    deleteButton.id = `delete-${quote.id}`;
    block.appendChild(deleteButton);

    li.appendChild(block);

    document.getElementById('quote-list').appendChild(li);
  });
  const deleteButtons = document.getElementsByClassName('btn-danger');

  for (button of deleteButtons) {
    button.addEventListener('click', (e) => {
      fetch(`http://localhost:3000/quotes/${e.target.id.split('-')[1]}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      clearQuotes(), getQuotes();
    });
  }

  const likeButtons = document.getElementsByClassName('btn-success');

  for (button of likeButtons) {
    button.addEventListener('click', (e) => {
      fetch(`http://localhost:3000/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          quoteId: `${parseInt(e.target.id.split('-')[1])}`,
        }),
      });
      clearQuotes(), getQuotes();
    });
  }
}

document.getElementById('new-quote-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = document.getElementsByTagName('input');
  addQuote(inputs);
});

function addQuote(quoteDetails) {
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      quote: quoteDetails[0].value,
      author: quoteDetails[1].value,
    }),
  });
  clearQuotes();
  getQuotes();
}

function clearQuotes() {
  document.getElementById('quote-list').remove();
  const newQuoteList = document.createElement('ul');
  newQuoteList.id = 'quote-list';
  document.querySelector('div').appendChild(newQuoteList);
}
