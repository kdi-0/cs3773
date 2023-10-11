import { headers } from "next/headers";

async function getURL() {
    const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : headers().get("host");
    return url
}
async function getUserDetails() {
    const url = await getURL();
    if (url !== null) {
        const uri = `${url}/api/accounts`;
        const res = await fetch(uri);
        return res.json()
    }
}
export default async function Page() {
    const data = await getUserDetails();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2 className={`mb-3 text-2xl font-semibold`}>
                <div>Hello World from /account{' '}</div>
                Data fetched from the server at route /api/accounts using GET:{' '}
                <div>
                    "userId:" {data["userId"]}
                </div>
            </h2>
        </main >
    );
}