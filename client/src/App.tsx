import './App.css'
import Papa from 'papaparse'
import Snowfall from 'react-snowfall'
import {Button} from "./components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog"
import {Input} from "./components/ui/input.tsx";
import { useToast } from "./components/ui/use-toast"
import {ChangeEvent, useState} from "react";
import {Banana, Loader2} from "lucide-react"
import {RedemptionForm} from "./components/redemptionForm.tsx";
import {Toaster} from "./components/ui/toaster.tsx";
import {Separator} from "./components/ui/separator.tsx";

function App() {
    const [isLoading, setIsLoading] = useState(false) //used to maintain loading state
    const [file, setFile] = useState<File | null>(null) //used to maintain loading state

    // Instantiate toast
    const { toast } = useToast()
// Helper function to convert csv to json
    const csvToJson = (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                complete: (result: { errors: string | any[]; data: any[] | PromiseLike<any[]> }) => {
                    if (result.errors.length) {
                        reject(result.errors);
                        return;
                    }
                    resolve(result.data);
                },
                header: true, // If your CSV has a header row, otherwise set to false
            });
        });
    };
// This is a function that clears the staff table in the database.
    async function clearStaffTable(): Promise<void> {
        const res :Response = await fetch("http://localhost:5000/api/staffs", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.ok) {
            const json = await res.json()
            console.log(json)
            toast({
                title: "Success!",
                description: "Staff Table Cleared",
            })
        }
        else {
            console.log("Staff Table Clear Failed")
        }
    }
// This is a function that clears the staff table in the database.
    async function clearRedemptionTable(): Promise<void> {
        const res :Response = await fetch("http://localhost:5000/api/redemption", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.ok) {
            const json = await res.json()
            console.log(json)
            toast({
                title: "Success!",
                description: "Redemption Table Cleared",
            })
        }
        else {
            console.log("Redemption Table Clear Failed")
        }
    }
// This is a function that uploads the csv data into the database.
    async function uploadStaffCSV(file: File|null): Promise<void> {
        setIsLoading(true)
        if (file == null) {
            console.log("No file selected")
            toast({
                variant: "destructive",
                title: "Error!",
                description: "No file selected",
            })
            setIsLoading(false)
            return
        }
        const jsonData:JSON[] = await csvToJson(file);
        // Convert jsonData to string
        const jsonString = JSON.stringify(jsonData);
        const res :Response = await fetch("http://localhost:5000/api/staffs", {
            method: "POST",
            body: jsonString,
            headers: {
                "Content-Type": "application/json",  // Indicate we're sending JSON data
            }
        })
        if (res.ok) {
            const json = await res.json()
            console.log(json)
            toast({
                title: "Success!",
                description: json.message,
            })
        }
        else {
            const json = await res.json()
            console.log(json)
            toast({
                variant: "destructive",
                title: "Failed!",
                description: json.message,
            })
        }
        setIsLoading(false)
    }

    // Handle file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null || e.target.files != undefined) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    };
  return (
    <>
        <Snowfall style={{opacity: "30%"}}/>
        <div className={"w-full min-h-screen bg-page-background flex flex-col items-center justify-center md:pt-8"}>
            <div className={"flex justify-between align-middle items-center max-w-screen-xl grow flex-col md:flex-row"}>
                {/*Admin Tools Button for uploading and modifying database that is outside normal use.*/}
                <Dialog >
                    <DialogTrigger asChild={true}>
                        <Button variant={"outline"} className={"text-character-inverse fixed top-4 right-8 dark"}>
                            <Banana className={"mr-2 text-yellow-300"}/>Admin Tools
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>ADMIN TOOLS</DialogTitle>
                            <DialogDescription className={"pb-4"}>
                                If you are seeing this in production, something is wrong.
                            </DialogDescription>
                            <div className={"flex flex-col space-y-3"}>
                                <Input type={"file"} accept={".csv"} id-={'uploadField'} onChange={handleFileChange}></Input>
                                <Button onClick={() => uploadStaffCSV(file)} className={`w-full ${isLoading ? 'hidden' : ''}`}>Upload Staffs CSV</Button>
                                <Button disabled className={`w-full ${isLoading ? '' : 'hidden'}`}>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                                <Separator/>
                                <Button onClick={clearStaffTable} className={"bg-christmas-red hover:bg-christmas-red hover:brightness-110"}>Clear Staff Table</Button>
                                <Button onClick={clearRedemptionTable} className={"bg-christmas-red hover:bg-christmas-red hover:brightness-110"}>Clear Redemption Table</Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                {/*Image*/}
                <img src={"/christmas.png"} alt="Christmas Image" className="w-1/2 pt-8 md:pt-24 min-w-[24rem]"/>
                {/* Main Content*/}
                <div className={"flex flex-col items-center md:items-end space-y-2 grow md:pr-[5%]"}>
                    <h1 className={"text-5xl text-center text-white sm:text-6xl lg:text-7xl xl:text-8xl "}>HO HO HO!</h1>
                    <h4 className={"text-2xl text-center text-white font-serif italic tracking-wide pb-4 xl:pb-16"}>'Tis the season for gifting</h4>
                    <Card className={"w-4/5 dark bg-transparent max-w-lg"}>
                        <CardHeader>
                            <CardTitle>Redeem Gifts</CardTitle>
                            <CardDescription className={""}>One representative to redeem on behalf of the entire team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RedemptionForm/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <footer className={"text-white brightness-50 text-center text-sm py-8"}>
                <p>© 2023 Seasonal Gifting</p>
                <p>Made for gds-swe-supplyally-govwallet take home assignemnt</p>
                <a href="https://www.linkedin.com/in/kevinthmm/">By Kevin Thom - https://www.linkedin.com/in/kevinthmm/</a>
            </footer>
        </div>
        <Toaster />
    </>
  )
}
export default App
