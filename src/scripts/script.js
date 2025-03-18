function generateQRCode() {
    let ssid = document.getElementById("ssid").value;
    let password = document.getElementById("password").value;
    let encryption = document.getElementById("encryption").value;
    let hidden = document.getElementById("hidden").checked ? "true" : "false";
    let isTransparent = document.getElementById("transparentBackground").checked;  // Get the transparent background option

    if (!ssid) {
        alert("Please enter an SSID (Wi-Fi Name).");
        return;
    }

    let wifiString = `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};;`;

    // Get the container for the QR code
    let qrcodeContainer = document.getElementById("qrcode");

    // Ensure the container exists
    if (!qrcodeContainer) {
        console.error("QR code container not found.");
        return;
    }

    // Clear previous QR code
    qrcodeContainer.innerHTML = "";

    // Set the color for background (transparent or white depending on the checkbox)
    let colorLight = isTransparent ? "transparent" : "#ffffff";

    // Generate QR code using the QRCode library
    let qrCode = new QRCode(qrcodeContainer, {
        text: wifiString,
        width: 200,
        height: 200,
        colorDark: "#000000",  // QR code dark color (black)
        colorLight: colorLight,  // Use transparent or white based on checkbox
        correctLevel: QRCode.CorrectLevel.H
    });
}


function downloadQRCode(format) {
    let canvas = document.querySelector("#qrcode canvas");
    
    if (!canvas) {
        alert("Please generate a QR code first!");
        return;
    }

    let link = document.createElement("a");
    let fileName = `wifi_qr_code.${format}`;

    if (format === "png") {
        // Ensure the canvas is transparent when downloaded as PNG
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Create a new transparent canvas for the download
        let transparentCanvas = document.createElement("canvas");
        let transparentContext = transparentCanvas.getContext("2d");

        transparentCanvas.width = canvas.width;
        transparentCanvas.height = canvas.height;

        // Draw the QR code on the transparent canvas
        transparentContext.putImageData(imgData, 0, 0);

        // Generate the download link for the transparent PNG
        link.href = transparentCanvas.toDataURL("image/png");
        link.download = fileName;
    } else if (format === "jpg") {
        // JPG doesn't support transparency, so we use a white background
        link.href = canvas.toDataURL("image/jpeg");
        link.download = fileName;
    } else if (format === "svg") {
        // Handle SVG download (as before)
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <image href="${canvas.toDataURL()}" width="200" height="200"/>
                   </svg>`;
        let blob = new Blob([svg], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
    }

    link.click();
}




function downloadQRCode(format) {
    let canvas = document.querySelector("#qrcode canvas");
    
    if (!canvas) {
        alert("Please generate a QR code first!");
        return;
    }

    let link = document.createElement("a");
    let fileName = `wifi_qr_code.${format}`;

    if (format === "png" || format === "jpg") {
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = fileName;
    } else if (format === "svg") {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <image href="${canvas.toDataURL()}" width="200" height="200"/>
                   </svg>`;
        let blob = new Blob([svg], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
    }

    link.click();
}
