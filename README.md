# Batch Image Downloader

A lightning-fast, serverless web application that automates the process of batch downloading, renaming, and packaging product images from an Excel or CSV file. 

Built with a highly optimized architecture for deployment on **Vercel**, this tool offloads the heavy zipping process to the user's browser while utilizing a backend proxy to bypass CORS restrictions and cache assets globally.

## Key Features

* **Client-Side Zipping:** Heavy processing (fetching and zipping) is handled directly in the browser using `JSZip`, completely eliminating server timeout limits and memory crashes.
* **Header-Agnostic Extraction:** Automatically reads Column A as the `SKU` and Column B as the `IMAGE URL`, completely ignoring header text. No strict templates required.
* **Dynamic Output Naming:** The generated `.zip` file automatically inherits the exact name of the uploaded Excel/CSV file.
* **Smart Duplicate Skipping:** Intelligently tracks and skips duplicate URLs within the dataset to save processing time and bandwidth.
* **Aggressive Edge Caching:** Backend proxy instructs the Vercel Edge Network to cache fetched images for a full year. Repeat downloads of the same SKU consume **0 compute tokens**.
* **Real-Time UI:** Features a dynamic progress bar and status text that updates seamlessly without freezing the browser.

## Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Client Libraries (CDN):** SheetJS (`xlsx`), `JSZip`, `FileSaver.js`
* **Backend Proxy:** Node.js, Express, Axios
* **Deployment:** Vercel (Serverless Functions)

## Expected Input Format

The application accepts both `.csv` and `.xlsx` files. The data must be structured in the first two columns (A and B). 

| Column A (Index 0) | Column B (Index 1) |
| :--- | :--- |
| Sku_ID_123 | `https://example.com/images/123.jpg` |
| Sku_ID_456 | `https://example.com/images/456.jpg` |

*Note: Completely blank rows are automatically skipped to prevent execution errors.*


