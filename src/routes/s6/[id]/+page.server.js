import { error } from '@sveltejs/kit';
import { getObject, Crawl } from '$lib/crawl';
import matkul from '$lib/mata_kuliah'
import { EMAIL, PASSWORD } from '$env/static/private'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const matakuliah = await getObject(matkul, params.id)
	if (matakuliah.link) {
			const abc = getObject(matkul, params.id)
			const data = await Crawl('https://edlink.id/login', EMAIL, PASSWORD, matakuliah.link);
			const data1 = abc.drive
		
			
		// Merging data and data1 by the "sesi" key
		const mergedData = { ...data };
		
		data1.forEach((item) => {
		  const existingIndex = mergedData.datas.findIndex((dataItem) => dataItem.sesi === item.sesi);
		
		  if (existingIndex !== -1) {
			mergedData.datas[existingIndex] = { ...mergedData.datas[existingIndex], ...item };
		  } else {
			mergedData.datas.push(item);
		  }
		});
		mergedData.AllLinks = abc.all_links
		return mergedData
	}

    throw error(404, 'Not found');
}

