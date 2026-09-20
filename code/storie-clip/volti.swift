import Foundation
import Vision
import AppKit
// Uso: volti <png>...  -> per ogni immagine stampa i riquadri dei volti in pixel (origine in alto a sinistra)
for path in CommandLine.arguments.dropFirst() {
    guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { print(path, "errore"); continue }
    let W = CGFloat(cg.width), H = CGFloat(cg.height)
    let req = VNDetectFaceRectanglesRequest()
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    var out: [String] = []
    for f in (req.results ?? []) {
        let b = f.boundingBox
        let x = b.minX*W, y = (1-b.maxY)*H, w = b.width*W, h = b.height*H
        out.append(String(format: "%.0f,%.0f,%.0f,%.0f", x, y, w, h))
    }
    print((path as NSString).lastPathComponent, out.joined(separator: " "))
}
