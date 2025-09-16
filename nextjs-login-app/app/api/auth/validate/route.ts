import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "users.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(raw) as Array<any>;

    const user = users.find(
      (usr) =>
        usr.email.toLowerCase() === String(email).toLowerCase() &&
        usr.password === password
    );

    if (user) {
      return NextResponse.json({
        ok: true,
        email: user.email,
        name: user.name,
      });
    }

    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
