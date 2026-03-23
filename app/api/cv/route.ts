import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "assets", "CV.pdf")

  if (!fs.existsSync(filePath)) {
    return new NextResponse("CV not found", { status: 404 })
  }

  const fileBuffer = fs.readFileSync(filePath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=\"Charchit_Singh_CV.pdf\"",
      "Content-Length": fileBuffer.length.toString(),
    },
  })
}
