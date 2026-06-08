#!/usr/bin/env python3
"""
Script to extract all image URLs from Rare You Forever Flower collection
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin, urlparse

class ImageExtractor:
    def __init__(self):
        self.base_url = "https://rareyou.com"
        self.collection_url = "https://rareyou.com/collections/forever-flower"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.product_urls = []
        self.image_urls = []
        
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
                if any(keyword in src.lower() for keyword in ['product', 'flower', 'bouquet', 'crochet', 'files/']):
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
    
    def extract_all_images(self):
        """Main method to extract all images"""
        print("Starting image extraction from Rare You Forever Flower collection...")
        
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
        
        return self.image_urls
    
    def save_results(self):
        """Save results to files"""
        # Save image URLs
        with open('image_urls.json', 'w') as f:
            json.dump(self.image_urls, f, indent=2)
        
        # Save product URLs
        with open('product_urls.json', 'w') as f:
            json.dump(self.product_urls, f, indent=2)
        
        # Create HTML file for easy viewing
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Rare You Forever Flower Collection Images</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                .image-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }}
                .image-item {{ border: 1px solid #ddd; padding: 10px; border-radius: 8px; }}
                .image-item img {{ max-width: 100%; height: auto; }}
                .image-url {{ font-size: 12px; color: #666; word-break: break-all; }}
            </style>
        </head>
        <body>
            <h1>Rare You Forever Flower Collection Images</h1>
            <p>Total images found: {len(self.image_urls)}</p>
            <div class="image-grid">
        """
        
        for img_url in self.image_urls:
            html_content += f"""
                <div class="image-item">
                    <img src="{img_url}" alt="Flower Image" onerror="this.style.display='none'">
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
        print(f"  - HTML gallery in 'image_gallery.html'")

def main():
    extractor = ImageExtractor()
    images = extractor.extract_all_images()
    extractor.save_results()
    
    print(f"\nExtraction complete! Found {len(images)} unique images.")
    print("Open 'image_gallery.html' in your browser to view all images.")

if __name__ == "__main__":
    main()
