# Rare You Forever Flower Image Extractor

🌸 **Automated script to extract all images from the Rare You Forever Flower collection**

## 📁 Files Created

1. **`extract_images.py`** - Basic image URL extractor
2. **`advanced_extractor.py`** - Advanced extractor with download capability
3. **`run_extractor.bat`** - Easy batch file to run the basic script
4. **`requirements.txt`** - Python dependencies

## 🚀 Quick Start

### Option 1: Basic Extractor (Just URLs)
```bash
# Install dependencies
pip install -r requirements.txt

# Run basic extractor
python extract_images.py

# Or use the batch file (Windows)
run_extractor.bat
```

### Option 2: Advanced Extractor (URLs + Downloads)
```bash
# Install dependencies
pip install -r requirements.txt

# Run advanced extractor
python advanced_extractor.py
```

## 📊 What the Scripts Do

### Basic Extractor (`extract_images.py`)
- ✅ Visits the Forever Flower collection page
- ✅ Extracts all product URLs (61 products)
- ✅ Visits each product page
- ✅ Extracts all image URLs from products
- ✅ Saves results in multiple formats

### Advanced Extractor (`advanced_extractor.py`)
- ✅ Everything the basic extractor does
- ✅ **Downloads all images** to local folder
- ✅ **Multi-threaded downloads** for speed
- ✅ **Interactive prompts** for customization
- ✅ **Detailed metadata** and statistics

## 📁 Output Files

After running either script, you'll get:

1. **`image_urls.json`** - All image URLs in JSON format
2. **`product_urls.json`** - All product URLs in JSON format
3. **`image_gallery.html`** - Visual gallery to view all images
4. **`extraction_metadata.json`** - Detailed extraction metadata (advanced only)
5. **`downloaded_images/`** - Folder with all downloaded images (advanced only)

## 🎯 Features

### Image Extraction Methods
- **HTML img tags** - Direct image extraction
- **JSON-LD data** - Structured data extraction
- **Shopify patterns** - E-commerce platform specific
- **Data attributes** - Lazy-loaded images

### Advanced Features
- **Multi-threaded downloads** - Faster image downloading
- **Error handling** - Robust error management
- **Rate limiting** - Respectful crawling
- **File naming** - Organized image naming
- **Progress tracking** - Real-time progress updates

## 🔧 Customization

### Modify Collection URL
```python
# In the script, change this line:
self.collection_url = "https://rareyou.com/collections/forever-flower"
```

### Change Download Settings
```python
# In advanced_extractor.py:
extractor = AdvancedImageExtractor(
    download_images=True,      # Set to False to skip downloads
    max_workers=5             # Number of concurrent downloads
)
```

### Filter Images
```python
# Modify the filter criteria in extract_images_from_product():
if any(keyword in src.lower() for keyword in ['product', 'flower', 'bouquet', 'crochet', 'files/']):
```

## 🌐 Viewing Results

### HTML Gallery
1. Open `image_gallery.html` in your browser
2. See all images in a beautiful grid layout
3. Click on images to view full size
4. Copy URLs directly from the page

### JSON Files
```json
// image_urls.json example
[
  "https://rareyou.com/cdn/shop/files/image1.jpg",
  "https://rareyou.com/cdn/shop/files/image2.jpg"
]
```

## 📱 Sample Output

```
🌸 Rare You Forever Flower Image Extractor 🌸
==================================================
Download images? (y/n): y
Number of concurrent downloads (default 5): 3

Starting advanced image extraction from Rare You Forever Flower collection...
Fetching collection page...
Found 61 product URLs
Extracting images from products...
Processing product 1/61: https://rareyou.com/products/tulip-whispers
  Found image: https://rareyou.com/cdn/shop/files/tulip-whispers-1.jpg
  Found image: https://rareyou.com/cdn/shop/files/tulip-whispers-2.jpg
...
Downloading 245 images...
Downloaded: downloaded_images/image_001.jpg
Downloaded: downloaded_images/image_002.jpg
...

Results saved:
  - 245 image URLs in 'image_urls.json'
  - 61 product URLs in 'product_urls.json'
  - Metadata in 'extraction_metadata.json'
  - HTML gallery in 'image_gallery.html'
  - Images downloaded to 'downloaded_images/' folder

✅ Extraction complete! Found 245 unique images.
🌐 Open 'image_gallery.html' in your browser to view all images.
📁 Check 'downloaded_images/' folder for downloaded images.
```

## ⚠️ Important Notes

### Rate Limiting
- Scripts include delays between requests
- Be respectful to the website server
- Don't run scripts too frequently

### File Sizes
- Images can be large (several MB each)
- Ensure you have enough disk space
- Download folder can grow quickly

### Network Issues
- Some images may fail to download
- Script continues on errors
- Check the console for error messages

## 🔒 Privacy & Ethics

- **Respectful crawling** - Includes delays between requests
- **No personal data** - Only extracts public product images
- **Educational purpose** - For learning and reference only
- **Credit Rare You** - All images belong to Rare You

## 🛠️ Troubleshooting

### Common Issues

**"ModuleNotFoundError"**
```bash
pip install -r requirements.txt
```

**"Connection timeout"**
- Check your internet connection
- Try running the script again
- Some images may be temporarily unavailable

**"Permission denied"**
- Run as administrator if needed
- Check antivirus software
- Ensure write permissions in the folder

**Large file sizes**
- Use the basic extractor to just get URLs
- Delete unwanted images from the download folder
- Monitor your disk space

### Getting Help

1. Check the console output for error messages
2. Ensure all dependencies are installed
3. Verify internet connection
4. Try with smaller `max_workers` value

## 🎉 Success!

After running the script, you'll have:
- **All product URLs** from the Forever Flower collection
- **All image URLs** from every product
- **Downloaded images** (if using advanced version)
- **Beautiful HTML gallery** for easy viewing
- **Complete metadata** for reference

**Enjoy exploring the beautiful Rare You Forever Flower collection!** 🌸✨
