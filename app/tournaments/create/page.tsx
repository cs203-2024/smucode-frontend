'use client'

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { capitalise, cn, generateCapacity, isPowerOfTwo } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { useUserContext } from '@/context/UserContext';

import { createTournament } from "@/services/tournamentAPI";

const TournamentStatusEnum = z.enum(["upcoming", "ongoing", "completed"]);
type TournamentStatusEnum = z.infer<typeof TournamentStatusEnum>;

const BandEnum = z.enum(["lower", "middle", "upper"]);
type BandEnum = z.infer<typeof BandEnum>;

const TournamentFormatEnum = z.enum(["single-elimination", "double-elimination", "round-robin"]);
type TournamentFormatEnum = z.infer<typeof TournamentFormatEnum>;

const capacityEnum: number[] = generateCapacity(64);

// const MAX_FILE_SIZE = 1024*1024*5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Tournament name must be at least 2 characters."
    }).max(50, {
        message: "Tournament name must be at most 50 characters."
    }),
    description: z.string().min(2, {
        message: "Tournament description must be at least 2 characters."
    }).max(500, {
        message: "Tournament description must be at most 500 characters."
    }),
    status: TournamentStatusEnum,
    format: TournamentFormatEnum,
    band: BandEnum,
    startDate: z.date({
        required_error: "Start date is required."
    }),
    endDate: z.date({
        required_error: "End date is required."
    }),
    signupStartDate: z.date({
        required_error: "Signup start date is required."
    }),
    signupEndDate: z.date({
        required_error: "Signup deadline is required."
    }),
    capacity: z.number().refine((value) => isPowerOfTwo(value) && value > 0, {
        message: "Number must be a power of 2.",
    }),
    timeWeight: z.number({required_error: "This field is required."}).refine((value) => value <= 100 && value >= 0, {
        message: "Time complexity weight must be between 0% and 100%."
    }),
    memWeight: z.number({required_error: "This field is required."}).refine((value) => value <= 100 && value >= 0, {
        message: "Space complexity weight must be between 0% and 100%."
    }),
    testCaseWeight: z.number({required_error: "This field is required."}).refine((value) => value <= 100 && value >= 0, {
        message: "Test case ratio weight must be between 0% and 100%."
    }),
    organiser: z.string().min(0, {
        message: "Organiser name must be at least 0 characters."
    }),
    icon: z.string() //z.instanceof(File, {message: "Please select a valid file."}).optional(),
})
.superRefine((data, ctx) => {
    if (data.timeWeight + data.memWeight + data.testCaseWeight !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The sum must equal 100%",
        path: ["timeWeight"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The sum must equal 100%",
        path: ["memWeight"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The sum must equal 100%",
        path: ["testCaseWeight"],
      });
    }
  })
.refine((data) => {
    console.log(data.startDate.getTime() + ", " + data.endDate.getTime());
    return data.startDate.getTime() < data.endDate.getTime();
}, {
    message: "Start Date Time must be before End Date Time.",
    path: ["startDate"]
})
.refine((data) => {
    console.log(data.signupEndDate.getTime() + ", " + data.startDate.getTime());
    return data.signupEndDate.getTime() < data.startDate.getTime();
}, {
    message: "Signups must end before Start Date Time.",
    path: ["signupEndDate"]
});

export default function CreateTournament() {

    const {user, logout} = useUserContext();
    //const validUsername = user ? user.username:"";

    const [waitingForAxios, setWaitingForAxios] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const [startHour, setStartHour] = useState(0);
    const [startMin, setStartMin] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMin, setEndMin] = useState(0);
    const [signUpHour, setSignUpHour] = useState(0);
    const [signUpMin, setSignUpMin] = useState(0);
    const [timeW, setTimeW] = useState(0);
    const [spaceW, setSpaceW] = useState(0);
    const [tcW, setTcW] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "upcoming",
            format: "single-elimination",
            band: "upper",
            capacity: 2,
            startDate: new Date(),
            endDate: new Date(),
            signupStartDate: new Date(),
            signupEndDate: new Date(),
            timeWeight: 0,
            memWeight: 0,
            testCaseWeight: 0,
            organiser: "admin",
            icon: ""//new File([], "nullIcon.png", { type: "image/png" })
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        console.log("submit clicked");
        setWaitingForAxios(true);
        const startDateWithTime = new Date(values.startDate);
        startDateWithTime.setHours(startHour, startMin, 0, 0);
        const endDateWithTime = new Date(values.endDate);
        endDateWithTime.setHours(endHour, endMin, 0, 0);
        const signUpDateWithTime = new Date(values.startDate);
        signUpDateWithTime.setHours(signUpHour, signUpMin, 0, 0);
        const statusCaps = values.status.toUpperCase();
        const bandCaps = values.band.toUpperCase();

        const updatedValues = {
            ...values,
            startDate: startDateWithTime,
            endDate: endDateWithTime,
            signupEndDate: signUpDateWithTime,
            timeWeight: timeW,
            memWeight: spaceW,
            testCaseWeight: tcW,
            status: statusCaps,
            band: bandCaps,
        };
        // console.log(updatedValues);

        // create tournament with axios
        try {
            const response = await createTournament(updatedValues);
            toast({
                title: "Tournament Created",
                description: "Tournament has been created successfully.",
            });
            router.push("/dashboard");
        } catch (error: any) {
            console.log("error creatingg tournament");
            toast({
                title: "Error Creating Tournament",
                description: "Uh-oh, there was a problem creating the tournament. Please try again.",
                variant: "destructive",  
            });
            console.log("toast passed");
        } finally {
            setWaitingForAxios(false);
        }

        return updatedValues;
    }

    return (
        <div className="w-full px-8 pt-4 mt-[60px]">            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-11 gap-8">
                    <div className="col-span-11 flex justify-between items-center gap-10">
                        <div className="flex flex-col justify-center gap-2 text-left">
                            <div className="text-2xl font-bold">Create Tournament</div>
                            <div className="text-sm font-medium text-gray-500">Fill in details about your new tournament</div>
                        </div>
                        {waitingForAxios ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting
                            </Button>
                        ):(
                            <Button type="submit">Create</Button>
                        )}
                    </div>
                    <div className="col-span-5 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. SMU Gardening Championships" className="w-full" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public tournament display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="format"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Format</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TournamentFormatEnum.options.map((option) => (
                                                    <SelectItem key={option} value={option}>{capitalise(option)}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Choose your tournament format.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Capacity</FormLabel>
                                        <Select  onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={""+field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a capacity" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {capacityEnum.map((option) => (
                                                    <SelectItem key={option} value={""+option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            The maximum number of players.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="band"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold gap-2">Band <TooltipLabel info="This is the band of players to select from in the case of an oversubscription for the tournament. E.g., if a tournament of capacity 32 has 60 players registered, selecting the 'Upper' band will result in the top 32 players with the highest ELO rating to be selected for registration" /></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the band" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {BandEnum.options.map((option) => (
                                                    <SelectItem key={option} value={option}>{capitalise(option)}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select the band of players.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="signupEndDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Registration Deadline</FormLabel>
                                <div className="flex justify-start items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>                                        
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    if (date) { 
                                                        const updatedDate = new Date(date); 
                                                        updatedDate.setHours(signUpHour, signUpMin, 0, 0); 
                                                        field.onChange(new Date(updatedDate)); 
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date < new Date() 
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input className="w-18" min={0} max={23} step={1} type="number" placeholder="HH" onChange={(e) => {
                                            const hour = e.target.value ? parseInt(e.target.value):0;
                                            setSignUpHour(hour);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(hour, signUpMin, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }}
                                    />
                                    :
                                    <Input className="w-18" min={0} max={59} step={1} type="number" placeholder="MM" onChange={(e) => {
                                            const min = e.target.value ? parseInt(e.target.value):0;
                                            setSignUpMin(min);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(signUpHour, min, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }} 
                                    />
                                </div>
                                <FormDescription>
                                    Signups will close on this date.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <div className="flex justify-start items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>                                        
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    if (date) { 
                                                        const updatedDate = new Date(date); 
                                                        updatedDate.setHours(startHour, startMin, 0, 0); 
                                                        field.onChange(new Date(updatedDate)); 
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date < new Date() 
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input className="w-18" min={0} max={23} step={1} type="number" placeholder="HH" onChange={(e) => {
                                            const hour = e.target.value ? parseInt(e.target.value):0;
                                            setStartHour(hour);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(hour, startMin, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }}
                                    />
                                    :
                                    <Input className="w-18" min={0} max={59} step={1} type="number" placeholder="MM" onChange={(e) => {
                                            const min = e.target.value ? parseInt(e.target.value):0;
                                            setStartMin(min);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(startHour, min, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }} 
                                    />
                                </div>
                                <FormDescription>
                                    Tournament begins on this date.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <div className="flex justify-start items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>                                        
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    if (date) { 
                                                        const updatedDate = new Date(date); 
                                                        updatedDate.setHours(signUpHour, signUpMin, 0, 0); 
                                                        field.onChange(new Date(updatedDate)); 
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date < new Date() 
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input className="w-18" min={0} max={23} step={1} type="number" placeholder="HH" onChange={(e) => {
                                            const hour = e.target.value ? parseInt(e.target.value):0;
                                            setEndHour(hour);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(hour, endMin, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }}
                                    />
                                    :
                                    <Input className="w-18" min={0} max={59} step={1} type="number" placeholder="MM" onChange={(e) => {
                                            const min = e.target.value ? parseInt(e.target.value):0;
                                            setEndMin(min);
                                            if (field.value) {
                                                const updatedDate = new Date(field.value); 
                                                updatedDate.setHours(endHour, min, 0, 0); 
                                                field.onChange(updatedDate); 
                                            }
                                        }} 
                                    />
                                </div>
                                <FormDescription>
                                    Tournament ends on this date.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-6 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="timeWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="font-semibold flex justify-between items-center">
                                        <FormLabel className="font-semibold flex justify-start items-center gap-2">Time Weight <TooltipLabel info="This is the time complexity/time taken for the code to finish running or the timeout duration" /></FormLabel>
                                        <div className="text-right">{timeW} %</div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span>0</span> 
                                        <FormControl className="mx-4 flex-1">
                                            <Slider
                                                defaultValue={[field.value]}
                                                min={0}
                                                max={100}
                                                step={1}
                                                onValueChange={(valueArray) => {
                                                    setTimeW(valueArray[0]);
                                                    field.onChange(valueArray[0]); 
                                                }}
                                            />
                                        </FormControl>
                                        <span>100</span>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="memWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="font-semibold flex justify-between items-center">
                                    <FormLabel className="font-semibold flex justify-start items-center gap-2">Space Weight <TooltipLabel info="This is the space complexity/memory used by the submitted code" /></FormLabel>
                                        <div className="text-right">{spaceW} %</div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span>0</span> 
                                        <FormControl className="mx-4 flex-1">
                                            <Slider
                                                defaultValue={[field.value]}
                                                min={0}
                                                max={100}
                                                step={1}
                                                onValueChange={(valueArray) => {
                                                    setSpaceW(valueArray[0])
                                                    field.onChange(valueArray[0]); 
                                                }}
                                            />
                                        </FormControl>
                                        <span>100</span>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="testCaseWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="font-semibold flex justify-between items-center">
                                    <FormLabel className="font-semibold flex justify-start items-center gap-2">Test Case Weight <TooltipLabel info="This is the ratio of test cases passed" /></FormLabel>
                                        <div className="text-right">{tcW} %</div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span>0</span> 
                                        <FormControl className="mx-4 flex-1">
                                            <Slider
                                                defaultValue={[field.value]}
                                                min={0}
                                                max={100}
                                                step={1}
                                                onValueChange={(valueArray) => {
                                                    setTcW(valueArray[0]);
                                                    field.onChange(valueArray[0]); 
                                                }}
                                            />
                                        </FormControl>
                                        <span>100</span>
                                    </div>
                                    <FormDescription>
                                        Precentage of weightage allocated to each statistic. Sum of all 3 Weights should be 100.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="eg. Winners will be awarded a 6-month internship with us" className="h-[35vh]" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Participants will be able to view this description. 
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-1 flex flex-col justify-center">
                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Logo (optional)</FormLabel>
                                            <div className="flex justify-center items-center p-6">
                                                {imagePreview ? (
                                                <Image src={imagePreview} alt="Uploaded Preview" className="bg-gray-300 w-40 h-40 object-cover rounded-full" width={160} height={160} />
                                                ) : (
                                                <div className="bg-gray-200 w-40 h-40 object-contain rounded-full text-gray-400 text-sm font-semibold flex items-center justify-center p-4 text-center" >No image uploaded</div>
                                                )}
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="file" accept={ACCEPTED_IMAGE_TYPES.join(",")} 
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && file instanceof File) {
                                                            field.onChange(file);  
                                                            form.trigger("icon"); 
                                                            const objectUrl = URL.createObjectURL(file);
                                                            setImagePreview(objectUrl);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Images must have the following formats: .jpeg or .jpg or .png 
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

function TooltipLabel({info}:{info: string}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className="inline-block cursor-pointer">
                    <QuestionMarkCircledIcon />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] text-center p-2">
                    <p>{info}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}