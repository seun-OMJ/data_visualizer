import React from "react";
import Overviewstats from "./Overviewstats";
import Popcharts from "./Popcharts";
import Genderchart from "./Genderchart";
import Fertilitychart from "./Fertilitychart";
function Overview() {
    return (<div className="flex flex-col gap-4 w-full bg-grey-700 ">
        <Overviewstats />
        <div className="flex flex-row gap-4 w-full ">
            <Popcharts />
            <Genderchart/>
            </div>
            <div><Fertilitychart/></div>
    </div>)
}
export default Overview;