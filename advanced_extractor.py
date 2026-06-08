#!/usr/bin/env python3
"""
Advanced script to extract and download all images from Rare You Forever Flower collection
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
import os
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib

class AdvancedImageExtractor:
    def __init__(self, download_images=True, max_workers=5):
        self.base_url = "https://rareyou.com"
        self.collection_url = "https://rareyou.com/collections/forever-flower"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.product_urls = []
        self.image_urls = []
        self.download_images = download_images
        self.max_workers = max_workers
        self.download_dir = "downloaded_images"
        
        # Create download directory if needed
        if self.download_images:
            os.makedirs(self.download_dir, exist_ok=True)
    
    def get_collection_page(self):
        """Get the collection page and extract product URLs"""
        try:
            response = self.session.get(self.collection_url)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching collection page: {e}")
            return None
    
    def extract_product_urls(self, html_content):
        """Extract product URLs from collection page"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Look for product links
        product_links = soup.find_all('a', href=re.compile(r'/products/'))
        
        for link in product_links:
            href = link.get('href')
            if href and '/products/' in href:
                full_url = urljoin(self.base_url, href)
                if full_url not in self.product_urls:
                    self.product_urls.append(full_url)
        
        print(f"Found {len(self.product_urls)} product URLs")
        return self.product_urls
    
    def get_product_page(self, product_url):
        """Get individual product page"""
        try:
            response = self.session.get(product_url)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching {product_url}: {e}")
            return None
    
    def extract_images_from_product(self, html_content, product_url):
        """Extract image URLs from product page"""
        soup = BeautifulSoup(html_content, 'html.parser')
        product_images = []
        
        # Method 1: Find all img tags
        img_tags = soup.find_all('img')
        for img in img_tags:
            src = img.get('src') or img.get('data-src')
            if src:
                # Convert relative URLs to absolute
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = urljoin(self.base_url, src)
                
                # Filter for product images (exclude icons, logos, etc.)
                if any(keyword in src.lower() for keyword in ['product', 'flower', 'bouquet', 'crochet', 'files/', 'cdn']):
                    if src not in product_images:
                        product_images.append(src)
        
        # Method 2: Look for JSON data in script tags
        script_tags = soup.find_all('script', type='application/ld+json')
        for script in script_tags:
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and 'image' in data:
                    if isinstance(data['image'], list):
                        for img in data['image']:
                            if img not in product_images:
                                product_images.append(img)
                    elif isinstance(data['image'], str):
                        if data['image'] not in product_images:
                            product_images.append(data['image'])
            except:
                pass
        
        # Method 3: Look for Shopify specific patterns
        shopify_patterns = [
            r'"url":"([^"]+\.(?:jpg|jpeg|png|webp))"',
            r'"src":"([^"]+\.(?:jpg|jpeg|png|webp))"',
            r'data-image="([^"]+\.(?:jpg|jpeg|png|webp))"'
        ]
        
        for pattern in shopify_patterns:
            matches = re.findall(pattern, html_content)
            for match in matches:
                if match.startswith('//'):
                    match = 'https:' + match
                elif match.startswith('/'):
                    match = urljoin(self.base_url, match)
                
                if match not in product_images:
                    product_images.append(match)
        
        return product_images
    
    def download_image(self, img_url, index):
        """Download a single image"""
        try:
            response = self.session.get(img_url, timeout=30)
            response.raise_for_status()
            
            # Generate filename from URL
            parsed_url = urlparse(img_url)
            path = parsed_url.path
            extension = os.path.splitext(path)[1] or '.jpg'
            
            # Create unique filename
            filename = f"image_{index:03d}{extension}"
            filepath = os.path.join(self.download_dir, filename)
            
            # Save image
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            return filepath
        except Exception as e:
            print(f"Error downloading {img_url}: {e}")
            return None
    
    def download_all_images(self):
        """Download all images using multiple threads"""
        if not self.download_images:
            return []
        
        print(f"Downloading {len(self.image_urls)} images...")
        downloaded_files = []
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all download tasks
            future_to_index = {
                executor.submit(self.download_image, img_url, i): (img_url, i)
                for i, img_url in enumerate(self.image_urls)
            }
            
            # Process completed downloads
            for future in as_completed(future_to_index):
                img_url, index = future_to_index[future]
                try:
                    filepath = future.result()
                    if filepath:
                        downloaded_files.append(filepath)
                        print(f"Downloaded: {filepath}")
                except Exception as e:
                    print(f"Error downloading {img_url}: {e}")
        
        return downloaded_files
    
    def extract_all_images(self):
        """Main method to extract all images"""
        print("Starting advanced image extraction from Rare You Forever Flower collection...")
        
        # Step 1: Get collection page
        print("Fetching collection page...")
        collection_html = self.get_collection_page()
        if not collection_html:
            return []
        
        # Step 2: Extract product URLs
        print("Extracting product URLs...")
        self.extract_product_urls(collection_html)
        
        # Step 3: Visit each product and extract images
        print("Extracting images from products...")
        for i, product_url in enumerate(self.product_urls, 1):
            print(f"Processing product {i}/{len(self.product_urls)}: {product_url}")
            
            product_html = self.get_product_page(product_url)
            if product_html:
                product_images = self.extract_images_from_product(product_html, product_url)
                for img_url in product_images:
                    if img_url not in self.image_urls:
                        self.image_urls.append(img_url)
                        print(f"  Found image: {img_url}")
            
            # Be respectful - add delay between requests
            time.sleep(1)
        
        # Step 4: Download images if requested
        if self.download_images and self.image_urls:
            downloaded_files = self.download_all_images()
        
        return self.image_urls
    
    def save_results(self):
        """Save results to files"""
        # Save image URLs
        with open('image_urls.json', 'w') as f:
            json.dump(self.image_urls, f, indent=2)
        
        # Save product URLs
        with open('product_urls.json', 'w') as f:
            json.dump(self.product_urls, f, indent=2)
        
        # Create detailed JSON with metadata
        metadata = {
            'extraction_date': time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_products': len(self.product_urls),
            'total_images': len(self.image_urls),
            'base_url': self.base_url,
            'collection_url': self.collection_url,
            'product_urls': self.product_urls,
            'image_urls': self.image_urls
        }
        
        with open('extraction_metadata.json', 'w') as f:
            json.dump(metadata, f, indent=2)
        
        # Create HTML file for easy viewing
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Rare You Forever Flower Collection Images</title>
            <meta charset="utf-8">
            <style>
                body {{ 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    background-color: #f5f5f5; 
                }}
                .header {{ 
                    text-align: center; 
                    background: linear-gradient(135deg, #ff6b6b, #4ecdc4); 
                    color: white; 
                    padding: 30px; 
                    border-radius: 10px; 
                    margin-bottom: 30px; 
                }}
                .stats {{ 
                    display: flex; 
                    justify-content: space-around; 
                    margin-bottom: 30px; 
                    flex-wrap: wrap; 
                }}
                .stat-box {{ 
                    background: white; 
                    padding: 20px; 
                    border-radius: 8px; 
                    text-align: center; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                    margin: 10px; 
                    min-width: 150px; 
                }}
                .image-grid {{ 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
                    gap: 20px; 
                }}
                .image-item {{ 
                    background: white; 
                    border: 1px solid #ddd; 
                    padding: 15px; 
                    border-radius: 8px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                    transition: transform 0.3s ease; 
                }}
                .image-item:hover {{ 
                    transform: translateY(-5px); 
                }}
                .image-item img {{ 
                    max-width: 100%; 
                    height: auto; 
                    border-radius: 5px; 
                }}
                .image-url {{ 
                    font-size: 12px; 
                    color: #666; 
                    word-break: break-all; 
                    margin-top: 10px; 
                    font-family: monospace; 
                }}
                .download-info {{ 
                    background: #e8f5e8; 
                    padding: 15px; 
                    border-radius: 8px; 
                    margin-bottom: 20px; 
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🌸 Rare You Forever Flower Collection 🌸</h1>
                <p>Complete image extraction from {len(self.product_urls)} products</p>
            </div>
            
            <div class="stats">
                <div class="stat-box">
                    <h3>{len(self.product_urls)}</h3>
                    <p>Products Found</p>
                </div>
                <div class="stat-box">
                    <h3>{len(self.image_urls)}</h3>
                    <p>Images Extracted</p>
                </div>
                <div class="stat-box">
                    <h3>{time.strftime('%Y-%m-%d')}</h3>
                    <p>Extraction Date</p>
                </div>
            </div>
            
            {f'<div class="download-info">✅ Images downloaded to: {self.download_dir}/ folder</div>' if self.download_images else ''}
            
            <div class="image-grid">
        """
        
        for i, img_url in enumerate(self.image_urls):
            html_content += f"""
                <div class="image-item">
                    <img src="{img_url}" alt="Flower Image {i+1}" onerror="this.style.display='none'">
                    <div class="image-url">{img_url}</div>
                </div>
            """
        
        html_content += """
            </div>
        </body>
        </html>
        """
        
        with open('image_gallery.html', 'w') as f:
            f.write(html_content)
        
        print(f"Results saved:")
        print(f"  - {len(self.image_urls)} image URLs in 'image_urls.json'")
        print(f"  - {len(self.product_urls)} product URLs in 'product_urls.json'")
        print(f"  - Metadata in 'extraction_metadata.json'")
        print(f"  - HTML gallery in 'image_gallery.html'")
        if self.download_images:
            print(f"  - Images downloaded to '{self.download_dir}/' folder")

def main():
    print("🌸 Rare You Forever Flower Image Extractor 🌸")
    print("=" * 50)
    
    # Ask user if they want to download images
    download_choice = input("Download images? (y/n): ").lower().strip()
    download_images = download_choice in ['y', 'yes']
    
    if download_images:
        max_workers = input("Number of concurrent downloads (default 5): ").strip()
        try:
            max_workers = int(max_workers) if max_workers else 5
        except:
            max_workers = 5
    else:
        max_workers = 1
    
    extractor = AdvancedImageExtractor(download_images=download_images, max_workers=max_workers)
    images = extractor.extract_all_images()
    extractor.save_results()
    
    print(f"\n✅ Extraction complete! Found {len(images)} unique images.")
    print("🌐 Open 'image_gallery.html' in your browser to view all images.")
    if download_images:
        print(f"📁 Check '{extractor.download_dir}/' folder for downloaded images.")

if __name__ == "__main__":
    main()
