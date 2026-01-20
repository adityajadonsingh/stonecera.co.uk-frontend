import { BreadcrumType } from "@/lib/types";
import { Home } from "lucide-react"
import Link from "next/link"
import React from "react";



export default function Breadcrum({ breadcrum }: { breadcrum: BreadcrumType[] }) {
    return (
        <>
            <ul className="flex gap-2">
                <li>
                    <Link href={"/"} className="flex items-center gap-x-1 hover:text-[#cb934f]"><Home size={18} /> <span className="font-semibold">Home</span></Link>
                </li>
                <li>/</li>
                {
                    breadcrum.map((bread, idx) => {

                        if (idx === breadcrum.length - 1) {
                            return (
                                <li key={`bread-${idx}`}>
                                    <span className="font-semibold capitalize text-[#cb934f]">{bread.pageName}</span>
                                </li>
                            )
                        } else {
                            return (
                                <React.Fragment key={`bread-frag-${idx}`}>
                                    <li>
                                        <Link href={bread.pageUrl} className="hover:text-[#cb934f]"><span className="font-semibold capitalize">{bread.pageName}</span></Link>
                                    </li>
                                    <li>/</li>
                                </React.Fragment>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}