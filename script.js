const authors = [
    {
        "id": 1,
        "name": "Darwin Tumaneng",
        "role": "Logistics Digitalization Services Unit Representative",
        "place": "Metro Manila, Philippine",
        "avatar_url": "tmsph-logo.jpg"
    },
    {
        "id": 2,
        "name": "Miguel Tianzon",
        "role": "Car Rental Business Representative",
        "place": "Metro Manila, Philippine",
        "avatar_url": "tmsph-logo.jpg"
    }
];

const news = [
    {
        "id": 1,
        "author_id": 1,
        "title": "Toyota Mobility Solutions PH empowers seafood wholesaler Mida Food with digital logistics platform",
        "body": "Logistics Platform addresses limitations in Mida Food's delivery operations",
        "image_url": "tmsph-ls-midafood.jpeg",
        "created_at": "2023-01-13 12:30:00"
    },
    {
        "id": 2,
        "author_id": 2,
        "title": "TMSPH launches Toyota Rent&#x3B1;Car",
        "body": "Toyota Mobility Solutions Philippines, Inc. (TMSPH) marked another milestone in its first year of operations with the introduction of its new and exciting car rental service, the Toyota Rent&#x3B1;Car. This service provides affordable and secure transportation through its convenient and flexible car rental options – both for short-term and long-term use.",
        "image_url": "tmsph-launches-toyota-rentacar.webp",
        "created_at": "2023-05-17 22:29:10"
    },
    {
        "id": 3,
        "author_id": 1,
        "title": "Toyota Motor Philippines partners with Lalamove Automotive",
        "body": "Leading mobility company Toyota Motor Philippines (TMP) has partnered with leading logistics provider Lalamove through its auto brand, Lalamove Automotive, with the introduction of the commercial vehicle Toyota Lite Ace as a transport partner. Aspiring and existing Lalamove operators are now able to purchase the Lite Ace Panel Van variant through this partnership, under Lalamove Automotive's Vehicle Ownership Program.",
        "image_url": "tmp-lalamove-partnership.webp",
        "created_at": "2023-07-05 02:15:01"
    }
];

let currentPage = 1;
const itemsPerPage = 1;

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `<div class="date-badge">
                <div class="date-day">${day}</div>
                <div class="date-month">${month}</div>
            </div>`;
}

function renderNewsPage(page) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedNews = news.slice(start, end);

    paginatedNews.forEach(item => {
        const author = authors.find(author => author.id === item.author_id);

        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsImageContainer = document.createElement('div');
        newsImageContainer.classList.add('news-image-container');

        const newsImage = document.createElement('img');
        newsImage.src = item.image_url;
        newsImage.alt = item.title;
        newsImageContainer.appendChild(newsImage);

        const newsDate = document.createElement('div');
        newsDate.innerHTML = formatDate(item.created_at);
        newsDate.classList.add('news-date');
        newsImageContainer.appendChild(newsDate);

        newsItem.appendChild(newsImageContainer);

        const authorInfo = document.createElement('div');
        authorInfo.classList.add('author-info');

        const authorDetails = document.createElement('div');
        authorDetails.classList.add('author-details');
        authorDetails.innerHTML = `<strong>${author.name}</strong><br>${author.role}<br>${author.place}`;

        authorInfo.appendChild(authorDetails);

        const shareButton = document.createElement('button');
        shareButton.classList.add('share-button');
        shareButton.innerHTML = `<i class="fas fa-share"></i> Share`;
        shareButton.addEventListener('click', () => {
            console.log(`Sharing ${item.title}`);
        });

        authorInfo.appendChild(shareButton); 

        newsItem.appendChild(authorInfo);

        const newsContent = document.createElement('div');
        newsContent.classList.add('news-item-content');

        const newsTitle = document.createElement('h2');
        newsTitle.textContent = item.title;

        const newsBody = document.createElement('p');
        newsBody.textContent = item.body;

        newsContent.appendChild(newsTitle);
        newsContent.appendChild(newsBody);

        newsItem.appendChild(newsContent);

        newsContainer.appendChild(newsItem);

        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read More';
        readMoreButton.classList.add('read-more-button');

        newsItem.appendChild(readMoreButton);

        newsContainer.appendChild(newsItem);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(news.length / itemsPerPage);
    const pageInfo = document.getElementById('page-info');
    const pageNumbers = document.getElementById('page-numbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.classList.add('page-number');
        pageNumber.textContent = i;
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderNewsPage(currentPage);
        });
        pageNumbers.appendChild(pageNumber);
    }

    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderNewsPage(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(news.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderNewsPage(currentPage);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderNewsPage(currentPage);
});
