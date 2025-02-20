document.addEventListener("DOMContentLoaded", async () => {
    const galleryContainer = document.getElementById("gallery");

    try {
        const response = await fetch("/Gallery/"); // Fetch directory listing
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const links = [...doc.querySelectorAll("a")].map(a => a.href);
        
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const images = links.filter(link => imageExtensions.some(ext => link.toLowerCase().endsWith(ext)));

        images.forEach(src => {
            // Extract filename from URL
            const filename = src.split('/').pop();

            // Create a container for the image and its name
            const imgContainer = document.createElement("div");
            imgContainer.style.textAlign = "center";
            imgContainer.style.margin = "10px";
            imgContainer.style.display = "inline-block";

            // Create image element
            const img = document.createElement("img");
            img.src = src;
            img.alt = filename;
            img.style.width = "200px";

            // Create label element
            const label = document.createElement("p");
            label.textContent = filename;
            label.style.fontSize = "14px";
            label.style.marginTop = "5px";

            // Append to container
            imgContainer.appendChild(img);
            imgContainer.appendChild(label);
            galleryContainer.appendChild(imgContainer);
        });
    } catch (error) {
        console.error("Error loading gallery images:", error);
    }
});
