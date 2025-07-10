import { NextResponse } from "next/server";
import { generateLatex } from "./latexTemplate";
import { getResumeData } from "@/app/_components/_data/resumeData";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

export async function GET() {
  try {
    const resumeData = await getResumeData();
    const latex = generateLatex(resumeData);

    // Write LaTeX to temp file
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "resume-"));
    const texPath = path.join(tmpDir, "resume.tex");
    await fs.writeFile(texPath, latex);

    // Compile LaTeX to PDF
    await new Promise((resolve, reject) => {
      const pdflatex = spawn("pdflatex", [
        "-output-directory",
        tmpDir,
        texPath,
      ]);
      pdflatex.on("close", (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          reject(new Error("pdflatex failed"));
        }
      });
    });

    // Read PDF
    const pdfPath = path.join(tmpDir, "resume.pdf");
    const pdfBuffer = await fs.readFile(pdfPath);

    // Return PDF as a ReadableStream
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(pdfBuffer));
        controller.close();
      },
    });
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Resume_Escarlan_John_Lester.pdf"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate resume PDF" },
      { status: 500 }
    );
  }
}
