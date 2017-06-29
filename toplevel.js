CodeMirror.defineSimpleMode("rtop", {
    start: [
	{regex: /assign|fun|fun/, token: "keyword"},
	{regex: /true|false|@/, token: "atom"},
	{regex: /unit|float/, token: "type"}
    ]
});

window.highlighted_lines = [];

window.codemirror =
    CodeMirror.fromTextArea(document.getElementById("input"), {
	lineNumbers: true,
	matchBrackets: true,
	viewportMargin: Infinity,
	gutters: ["CodeMirror-linenumbers","errors"],
	mode: "rtop"
    });

window.seterror = function(line, msg) {

    clearerrors();

    if (line > 0) {
	var n = document.createElement("div");
	n.className = "error-marker";
	n.setAttribute("title", msg);
	window.codemirror.setGutterMarker(line-1, "errors", n);
	window.codemirror.addLineClass(line-1, "wrap", "error-line");
    }
    function esc(s) {
	return s.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
    }
    var holder = document.getElementById("error");
    holder.innerHTML =
	"<div class='error-marker'></div><span>" + esc(msg) + "</span>";
};

window.clearerrors = function() {
    window.codemirror.clearGutter("errors");
    document.getElementById("error").innerHTML = "";
    window.codemirror.eachLine(function (lh) {
	window.codemirror.removeLineClass(lh,"wrap");
    });
}

window.settext = function(i, t) {
    var n = document.getElementById(i);
    CodeMirror.runMode(t, "rtop", n);

}
