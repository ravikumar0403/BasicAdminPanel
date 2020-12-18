const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var userDetails = []
$.get(url, function( data,status ) {
    if(status==="success"){
        userDetails = data.slice(0,5);
        createDataRows(userDetails)
    }
})

function createDataRows(data){
    let i=0;
    $("tbody").html("")
    for(i=0; i<5;i++){
        $("tbody").append(createDataRow(data[i]))
    }
    $('.data-row').click(function(e){
        showDetails(e.target.parentElement)
    })
}

function createDataRow(rowData){
    return `
    <tr class="data-row">
        <td class="column1">${rowData.id}</td>
        <td class="column2">${rowData.firstName}</td>
        <td class="column3">${rowData.lastName}</td>
        <td class="column4">${rowData.email}</td>
        <td class="column5">${rowData.phone}</td>
    </tr>`
}

function showDetails(detailsEl){
    userId = detailsEl.children[0].innerText
    $(".data-row").removeClass("active")
    detailsEl.className = ("data-row active")
    for (var i=0;i<userDetails.length;i++){
        if (userDetails[i].id == userId){
            var infoContent = `
            <div><b>User selected:</b> ${userDetails[i].firstName} ${userDetails[i].lastName}</div>
            <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readonly>
                    ${userDetails[i].description}
                </textarea>
            </div>
            <div><b>Address:</b> ${userDetails[i].address.streetAddress}</div>
            <div><b>City:</b> ${userDetails[i].address.city}</div>
            <div><b>State:</b> ${userDetails[i].address.state}</div>
            <div><b>Zip:</b> ${userDetails[i].address.zip}</div>
        `
        }
    }
    $("#info-content").show()
    // console.log(infoContent)
    $("#info-content").html(infoContent)
}

let input = document.getElementById('search-box')
input.addEventListener("input", ()=>{
    console.log(input.value.toUpperCase())
    let filteredList = userDetails.filter((curr) => {
        return curr.firstName.toLowerCase().includes(input.value.toLowerCase())
    })
    createDataRows(filteredList)
    // console.log(filteredList)
})


