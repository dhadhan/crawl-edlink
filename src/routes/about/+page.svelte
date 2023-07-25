<script>
    import matkul from '../../lib/mata_kuliah'
    import response from '../../lib/test'
    // const data1 = JSON.stringify(matkul)

    const getObject = (obj, nameToSearch) => {
	const foundObject = obj.mata_kuliah.find(
		(item) => item.name === nameToSearch
	  );
	  return foundObject ? foundObject : null;
    }

    const datafind = "perilaku-organisasi"
    const abc = getObject(matkul, datafind)
    const data = response
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

function capitalizeEachWord(inputString) {
  const words = inputString.split(' ');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(' ');
}
function getResultStatus(status) {
 if (status === "Hadir? KPRS") {
    return "bg-yellow-200 text-yellow-600";
  }else if (status === "Alpa") {
    return "bg-red-200 text-red-600";
  } else if (status === "Materi Online") {
    return "bg-purple-200 text-purple-600";
  }else {
    return "bg-green-200 text-green-600";
  }
}
console.log(mergedData);
  
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>


<div class="overflow-x-hidden bg-gray-50">
    <section class="pt-12 bg-gray-50 sm:pt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
                <h1 class="font-bold px-6 text-lg text-gray-600 font-inter">Ahmad <span class="relative inline-flex sm:inline">
                    <span class="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                    <span class="relative"> Ramadhan </span>
                </span> - 2020410012</h1>
                <p class="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-3xl lg:text-3xl lg:leading-tight font-pj">{capitalizeEachWord(mergedData.infoKelas.kelas)} - {mergedData.infoKelas.codeKelas}
                </p>
                <p class="font-bold px-6 text-lg text-gray-600 font-inter">
                    {mergedData.infoKelas.dosen}
                </p>
                <a href="{abc.all_links}" target="_blank" class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 mt-2">
                    <svg class="w-5 h-5 mr-2 -ml-1" fill='#fff' aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344.4 143.8c-89.6-87.8-242-40-264.6 83.9a93.1 93.1 0 00-72 55v.2A93.3 93.3 0 0093.3 413h282.2c75.3 0 136.5-61.2 136.5-136.4 0-87.5-81.7-153-167.6-133zM375.5 381H93.3C24 381.1 8.7 283 74.6 261.7c14.7-4.7 43-7.4 74.3 21.9a16 16 0 0021.9-23.4 122 122 0 00-58.5-31.5c22-99 147.3-131.9 215.2-56.3a16 16 0 0016.7 4.6 104.6 104.6 0 1131.3 204.2z"/></svg>
                    Tugas / UTS / UAS
                  </a>
            </div>
        </div>

        <div class="overflow-x-auto">
            <div
              class="min-w-screen min-h-screen flex justify-center overflow-x-auto	"
            >
              <div class="w-full lg:w-5/6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="min-w-max w-full table-auto rounded-sm">
                    <thead>
                      <tr
                        class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                      >
                        <th class="py-3 px-6 text-left">Session</th>
                        <th class="py-3 px-6 text-left">Time</th>
                        <th class="py-3 px-6 text-center">Absensi</th>
                        <th class="py-3 px-6 text-center">Evidence</th>
                        <th class="py-3 px-6 text-center">Edlink</th>
                        <th class="py-3 px-6 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody class=" font-medium text-gray-600 text-sm">
                    {#each mergedData.datas as db}
                      <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{db.sesi}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span>{db.times}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span
                              class="{getResultStatus(db.absensi)} py-1 px-3 rounded-lg text-xs"
                              >{db.absensi ? db.absensi: "Hadir"}</span
                            >
                          </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex items-center justify-center ">
                            {#if db.dlink}
                            <a href='{db.dlink}' type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:{"bg-gradient-to-bl","scale-125" } focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs px-3 py-1 text-center inline-flex items-center ">
                                <svg class="w-4 h-4 mr-1" fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442 442"><path d="M221 341.3c-49.7 0-103.2-19.4-154.7-56.2a391.6 391.6 0 01-63.2-55.9c-4.1-4.7-4.1-11.7 0-16.4 1-1.1 24.7-28.4 63.2-55.8 51.5-36.8 105-56.3 154.7-56.3 49.7 0 103.2 19.5 154.7 56.3a391.7 391.7 0 0163.3 55.8c4 4.7 4 11.7 0 16.4-1 1.1-24.8 28.4-63.3 55.9-51.5 36.8-105 56.2-154.7 56.2zM29.6 221c9.6 9.8 27.8 27 51.7 44 32.9 23.5 83.7 51.3 139.7 51.3s106.9-27.8 139.7-51.2c24-17 42-34.3 51.7-44-9.6-9.9-27.7-27.1-51.7-44.2C328 153.6 277 125.7 221 125.7S114.2 153.6 81.3 177c-24 17-42 34.3-51.7 44.1z"/><path d="M221 298.5a77.6 77.6 0 1151-135.8 12.5 12.5 0 11-16.4 18.8 52.4 52.4 0 1018 39.5 12.5 12.5 0 0125 0 77.6 77.6 0 01-77.6 77.5z"/><path d="M221 246a25 25 0 110-50 25 25 0 010 50z"/></svg>
                                G. Drive</a>   
                            {/if}
                            
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                            {#if db.status}
                            <span
                            class="{getResultStatus(db.status)} py-1 px-3 rounded-lg text-xs"
                            >{db.status}</span
                          >
                            
                            {/if}
                          
                        </td>
                        <td class="py-3 px-6 text-left">
                            <div class="flex items-center">
                              <span>{db.keterangan ? db.keterangan: ""}</span>
                            </div>
                          </td>
                      </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </section>
</div>
