# Twisty Tales by Sharvari - Website Setup Guide

## 🌸 Adding Instagram Photos and Videos

This guide will help you add real photos and videos from your Instagram profile to the website.

### 📁 Folder Structure

```
assets/
├── images/
│   ├── hero-background.jpg
│   ├── classic-rose.jpg
│   ├── sunny-sunflower.jpg
│   ├── daisy-delight.jpg
│   ├── tulip-trio.jpg
│   └── tropical-paradise.jpg
└── videos/
    ├── hero-background.mp4
    └── mixed-bouquet.mp4
```

### 📥 How to Download Instagram Media

1. **Go to your Instagram profile**: https://www.instagram.com/twisty_tales_by.sharvari
2. **Download photos and videos** using one of these methods:
   - Use Instagram's built-in download feature (for your own posts)
   - Use a third-party tool like "Download Instagram Photos" or "InstaSave"
   - Take screenshots (for photos only)

### 🖼️ Adding Images

1. **Resize images** for web optimization:
   - Gallery images: 800x600 pixels (recommended)
   - Hero background: 1920x1080 pixels (recommended)
   - Format: JPG or PNG
   - File size: Under 500KB each

2. **Place images in the correct folder**:
   - Gallery images → `assets/images/`
   - Hero background → `assets/images/hero-background.jpg`

3. **Image naming convention**:
   ```
   classic-rose.jpg      (for red rose bouquets)
   sunny-sunflower.jpg  (for sunflower arrangements)
   daisy-delight.jpg    (for daisy bouquets)
   tulip-trio.jpg       (for tulip arrangements)
   tropical-paradise.jpg (for exotic flowers)
   hero-background.jpg  (for hero section background)
   ```

### 🎥 Adding Videos

1. **Resize videos** for web optimization:
   - Hero background: 1920x1080 pixels (16:9 ratio)
   - Gallery videos: 800x600 pixels
   - Format: MP4 (H.264 codec)
   - Duration: 10-30 seconds for gallery, 15-60 seconds for hero
   - File size: Under 5MB each

2. **Place videos in the correct folder**:
   - Hero background → `assets/videos/hero-background.mp4`
   - Gallery videos → `assets/videos/`

3. **Video naming convention**:
   ```
   hero-background.mp4  (for hero section background video)
   mixed-bouquet.mp4   (for mixed bouquet video)
   ```

### 🔄 Updating the Website

After adding your media files:

1. **Refresh the browser** - The new images/videos should appear automatically
2. **Check file names** - Make sure they match exactly what's in the HTML
3. **Test all media** - Click on gallery items to ensure they open properly

### 📱 Mobile Optimization Tips

- Keep image file sizes small for faster loading on mobile
- Test videos on mobile devices to ensure they play properly
- Consider using shorter videos for mobile users

### 🎨 Customization Options

#### Changing Gallery Categories
Edit the `data-category` attribute in `index.html`:
```html
<div class="gallery-item" data-category="roses">
```

#### Adding New Gallery Items
Copy this structure in `index.html`:
```html
<div class="gallery-item" data-category="your-category">
    <div class="gallery-image">
        <img src="assets/images/your-image.jpg" alt="Your Title" class="gallery-photo">
        <div class="image-overlay">
            <i class="fas fa-heart"></i>
        </div>
    </div>
    <div class="gallery-info">
        <h3>Your Title</h3>
        <p>Your Description</p>
    </div>
</div>
```

#### Adding New Video Items
```html
<div class="gallery-item" data-category="your-category">
    <div class="gallery-image">
        <video class="gallery-video" muted loop playsinline>
            <source src="assets/videos/your-video.mp4" type="video/mp4">
        </video>
        <div class="video-overlay">
            <i class="fas fa-play-circle"></i>
        </div>
    </div>
    <div class="gallery-info">
        <h3>Your Title</h3>
        <p>Your Description</p>
    </div>
</div>
```

### 🚀 Performance Tips

1. **Compress images** using tools like TinyPNG or ImageOptim
2. **Optimize videos** using HandBrake or similar tools
3. **Use WebP format** for images if supported by your hosting
4. **Enable lazy loading** (already implemented in the code)

### 📞 Need Help?

If you encounter any issues:
1. Check that file names match exactly
2. Ensure files are in the correct folders
3. Verify file formats (JPG/PNG for images, MP4 for videos)
4. Test in different browsers

### 🌟 Recommended Content for Your Instagram

Based on your business, these types of content work well:

- **Close-up shots** of individual flowers
- **Bouquet arrangements** from different angles
- **Behind-the-scenes** videos of you making flowers
- **Happy customer photos** (with permission)
- **Seasonal arrangements** and special designs
- **Time-lapse videos** of flower creation process

---

**Website Features:**
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions
- ✅ Video autoplay on hover
- ✅ Image lazy loading for performance
- ✅ Modal popups for detailed views
- ✅ Contact form integration
- ✅ Social media ready

Your website is now ready to showcase your beautiful pipe cleaner flowers! 🌺🌻🌸
