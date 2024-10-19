import { GrOverview } from "react-icons/gr"
import { BsClipboard2Data } from "react-icons/bs";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'Overview',
		label: 'Overview',
		path: '/',
		icon: <GrOverview />
	},

	{
		key: 'DataList',
		label: 'Data List',
		path: '/datalist',
		icon: <BsClipboard2Data />
	}
]
