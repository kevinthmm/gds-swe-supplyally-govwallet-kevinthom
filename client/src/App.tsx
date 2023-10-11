import './App.css'
// import {Button} from "../@/components/ui/button.tsx";
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
import {Banana} from "lucide-react"
import {RedemptionForm} from "./components/redemptionForm.tsx";



function App() {
  return (
    <>
        <div className={"w-screen h-screen bg-page-background flex flex-col items-center justify-center"}>
            <div className={"flex justify-between align-middle items-center max-w-screen-xl grow"}>
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
                                <Button>Upload Staffs CSV</Button>
                                <Button className={"bg-christmas-red hover:bg-christmas-red hover:brightness-110"}>Clear Staff Table</Button>
                                <Button className={"bg-christmas-red hover:bg-christmas-red hover:brightness-110"}>Clear Redemption Table</Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                {/*Image*/}
                <img src={"/christmas.png"} alt="Christmas Image" className="w-1/2"/>
                {/* Main Content*/}
                <div className={"flex flex-col items-end space-y-2 grow pr-[5%]"}>
                    <h1 className={"text-7xl text-center text-white xl:text-8xl"}>HO HO HO!</h1>
                    <h4 className={"text-2xl text-center text-white font-serif italic tracking-wide pb-2 xl:pb-8"}>'Tis the season for gifting</h4>
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
            <footer className={"text-white brightness-50 text-center text-sm pb-4"}>
                <p>© 2023 Seasonal Gifting</p>
                <p>Made for gds-swe-supplyally-govwallet take home assignemnt</p>
                <a href="https://www.linkedin.com/in/kevinthmm/">By Kevin Thom - https://www.linkedin.com/in/kevinthmm/</a>
            </footer>
        </div>
    </>
  )
}

export default App
