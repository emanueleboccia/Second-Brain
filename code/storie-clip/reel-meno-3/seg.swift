import Foundation
import Vision
import AppKit
import CoreImage
// Uso: seg <out_dir> <png>...  -> maschera della persona (bianco = persona) alla stessa misura dell'immagine
let args = Array(CommandLine.arguments.dropFirst()); let outDir = args[0]
let ctx = CIContext()
for path in args.dropFirst() {
    guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { print(path, "errore"); continue }
    let req = VNGeneratePersonSegmentationRequest(); req.qualityLevel = .accurate; req.outputPixelFormat = kCVPixelFormatType_OneComponent8
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    guard let pb = req.results?.first?.pixelBuffer else { print(path, "nessuna"); continue }
    var ci = CIImage(cvPixelBuffer: pb)
    ci = ci.transformed(by: CGAffineTransform(scaleX: CGFloat(cg.width)/ci.extent.width, y: CGFloat(cg.height)/ci.extent.height))
    let name = (path as NSString).lastPathComponent
    let url = URL(fileURLWithPath: outDir).appendingPathComponent(name)
    try? ctx.writePNGRepresentation(of: ci, to: url, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
}
print("ok")
