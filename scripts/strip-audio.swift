// Rebuilds an mp4 from its video track alone. Passthrough preset, so the
// H.264 bitstream is copied rather than re-encoded — no generation loss.
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count == 3 else {
    FileHandle.standardError.write("usage: strip-audio <in.mp4> <out.mp4>\n".data(using: .utf8)!)
    exit(2)
}
let src = URL(fileURLWithPath: args[1])
let dst = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: dst)

let asset = AVURLAsset(url: src)
guard let videoTrack = asset.tracks(withMediaType: .video).first else {
    FileHandle.standardError.write("no video track\n".data(using: .utf8)!)
    exit(1)
}

let comp = AVMutableComposition()
guard let compTrack = comp.addMutableTrack(withMediaType: .video,
                                           preferredTrackID: kCMPersistentTrackID_Invalid) else {
    FileHandle.standardError.write("could not add track\n".data(using: .utf8)!)
    exit(1)
}
do {
    try compTrack.insertTimeRange(CMTimeRange(start: .zero, duration: asset.duration),
                                  of: videoTrack, at: .zero)
    compTrack.preferredTransform = videoTrack.preferredTransform
} catch {
    FileHandle.standardError.write("insert failed: \(error)\n".data(using: .utf8)!)
    exit(1)
}

guard let export = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetPassthrough) else {
    FileHandle.standardError.write("no export session\n".data(using: .utf8)!)
    exit(1)
}
export.outputURL = dst
export.outputFileType = .mp4
export.shouldOptimizeForNetworkUse = true

let sem = DispatchSemaphore(value: 0)
export.exportAsynchronously { sem.signal() }
sem.wait()

if export.status != .completed {
    FileHandle.standardError.write("export failed: \(export.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!)
    exit(1)
}
