document.addEventListener('DOMContentLoaded', qnoteInit);
//document.querySelector("div.qnote-list").addEventListener("load",qnoteInit)
//document.querySelector("div.qnote-list").addEventListener('DOMNodeInserted', qnoteInit, false)
function qnoteInit(event){
	loadStoredNotes();	
	document.querySelector("#qnote-clear").addEventListener("click", cleanNotes)
	//document.querySelector("#qnote-add-item").addEventListener("click", addNote)
}
function deleteQnoteItem(ele){
	let p=ele;
	while(p && p.tagName !="A" ) 
	  p=p.parentElement;
	let idx= parseInt(p.getAttribute("data-qnote-item-no"));  
	var storedNotes= new Array();
	storedNotes = JSON.parse(localStorage.getItem("notes"));
	storedNotes.splice(idx,1);
	localStorage.setItem('notes', JSON.stringify(storedNotes));  
	Array.from( document.querySelectorAll(".qnote-item")).forEach((ele)=>ele.remove());  
    loadStoredNotes();
}

/*
$(document).ready(function(){
	loadStoredNotes();	
	$(document).on('click', '#crteStkyBtn', addNote);
	$(document).on('click', '#clnStorge', cleanNotes);
	


// $("textarea").on("change keyup input",function(){
// 	if($(this).val().length>0)$("#crteStkyBtn").removeClass("ntActv");
// 	else if($(this).val().length>100)
// 	this.value=this.value.substring(0,max);
// 	else $("#crteStkyBtn").addClass("ntActv")});

});
*/
function cleanNotes(){
	localStorage.clear();
	Array.from( document.querySelectorAll(".qnote-item")).forEach((ele)=>ele.remove());
	loadStoredNotes();
}

function getStoredNotes(){
	var storedNotes= new Array();
	let txt= localStorage.getItem("notes");
	if (txt && txt!="")
	  storedNotes = JSON.parse(txt);
	return storedNotes;
}

function loadStoredNotes(){
	var pastNotes= getStoredNotes()
	pastNotes.forEach((value,idx) => {
		if(value!="") 
		displayQnoteItem(JSON.parse(value),idx)
	});

}


 
function addNote(){
     var usrInput = $('.txtBox').val();
	  var title = $('.txtitle').val();
	if(usrInput.length > 0){
		addtoSticky({title: title, text:usrInput});
	}else{

	}
}


function addtoSticky(note){
	if(note != null){
  	    var current = getStoredNotes();//JSON.parse(localStorage.getItem("notes"));
		let len = current.push(JSON.stringify(note));
		localStorage.setItem('notes', JSON.stringify(current));
	    displayQnoteItem(note,len-1);
	}	
}
/*
function displayQnoteItem(note){
  if(note == null) return;
  $('ul.qnote-list').append('<li class="qnote-box"><h3 class="m-0 p-0">' + note.title + '</h3>'+note.text+'</li>');
} 
*/

function displayQnoteItem(note, idx){
	var tmp1= `
    <a href="#" data-qnote-item-no=${idx} class="qnote-item list-group-item list-group-item-action py-3 lh-tight" >
      <div class="d-flex w-100 align-items-center justify-content-between">
        <strong class="mb-1 note_title">${note.title}</strong>
        <small>
		<button onclick="deleteQnoteItem(this)" type="button" class="btn btn-primary">D</button>
		<button  type="button" class="btn btn-primary qnote-item-edit">E</button>		
		</small>
      </div>
      <div class="col-10 mb-1 small note_text">${note.text}</div>
    </a>	
	`;
	if(note == null) return;
	
	$('div.qnote-list').append(tmp1);
  } 
	