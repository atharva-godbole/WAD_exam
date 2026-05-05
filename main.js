// 1. Sample Data (At least 11 items to test pagination)
const products = [
    { name: "Smartphone X", price: 45000, desc: "High-end flagship phone.", img: "prod1.jpg" },
    { name: "Laptop Pro", price: 85000, desc: "16GB RAM, 512GB SSD.", img: "prod2.jpg" },
    { name: "Bluetooth Buds", price: 2500, desc: "Noise cancelling wireless buds.", img: "prod3.jpg" },
    { name: "Smart Watch", price: 5000, desc: "Fitness tracking and GPS.", img: "prod4.jpg" },
    { name: "Gaming Mouse", price: 1500, desc: "RGB lighting, 12000 DPI.", img: "prod5.jpg" },
    { name: "Keyboard", price: 3000, desc: "Mechanical switches.", img: "prod6.jpg" },
    { name: "Monitor", price: 12000, desc: "24-inch Full HD Display.", img: "prod7.jpg" },
    { name: "Power Bank", price: 1200, desc: "20000mAh fast charging.", img: "prod8.jpg" },
    { name: "External HDD", price: 4000, desc: "1TB Portable storage.", img: "prod9.jpg" },
    { name: "Webcam", price: 2200, desc: "1080p HD video calls.", img: "prod10.jpg" },
    { name: "USB Hub", price: 800, desc: "4-in-1 USB 3.0 connector.", img: "prod11.jpg" },
    { name: "Desk Lamp", price: 1100, desc: "LED with adjustable brightness.", img: "prod12.jpg" }
];

const rowsPerPage = 10;
let currentPage = 1;

// 2. Function to display the table rows
function displayTable(page) {
    const tableBody = document.getElementById('product-body');
    tableBody.innerHTML = ""; // Clear current table
    
    // Calculate start and end indices
    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = products.slice(start, end);

    paginatedItems.forEach(item => {
        let row = `<tr>
            <td><img src="${item.img}" alt="${item.name}" class="product-img"></td>
            <td><strong>${item.name}</strong></td>
            <td>₹${item.price.toLocaleString('en-IN')}</td>
            <td>${item.desc}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// 3. Function to create pagination buttons
function setupPagination() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = "";
    
    let pageCount = Math.ceil(products.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement('li');
        btn.className = `page-item ${currentPage === i ? 'active' : ''}`;
        btn.innerHTML = `<button class="page-link">${i}</button>`;
        
        btn.addEventListener('click', () => {
            currentPage = i;
            displayTable(currentPage);
            setupPagination(); // Redraw to update the 'active' button
        });
        
        paginationControls.appendChild(btn);
    }
}

// Initial Call
displayTable(currentPage);
setupPagination();