import { DropDown } from '../../dropDown';
import './siteAdd.css';

export function SiteAddPage() {
	const items = [
		{ value: 'itay' },
		{ value: 'yakir' },
		{ value: 'eden' },
		{ value: 'ron' },
	];
	return (
		<div className='site-add-page-container'>
			<DropDown title={'NEWTITLE'} items={items}></DropDown>
		</div>
	);
}
