"use client"
import { Skeleton } from "../ui/skeleton";

const Loading = () => {
    const rows = 4;

    return (
        <div className="w-full space-y-14 p-4 animate-pulse container mx-auto">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-body/10" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px] bg-body/10" />
                    <Skeleton className="h-4 w-[150px] bg-body/10" />
                </div>
            </div>

            {[...Array(rows)].map((_, i) => (
                <div key={i} className="space-y-6">
                    <Skeleton className="h-4 w-full max-w-[300px] bg-body/10" />
                    <div className="flex space-x-2">
                        <Skeleton className="h-20 w-20 rounded-md bg-body/10" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-8 w-full bg-body/10" />
                            <Skeleton className="h-8 w-[80%] bg-body/10" />
                            <Skeleton className="h-8 w-[60%] bg-body/10" />
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-10 rounded-full bg-body/10" />
                <Skeleton className="h-6 w-[100px] bg-body/10" />
                <Skeleton className="h-10 w-10 rounded-full bg-body/10" />
            </div>
        </div>
    );
};

export default Loading;