<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>MIDI Scales Player</title>
	<!-- polyfill -->
	<script src="midi-js/inc/shim/Base64.js" type="text/javascript"></script>
	<script src="midi-js/inc/shim/Base64binary.js" type="text/javascript"></script>
	<script src="midi-js/inc/shim/WebAudioAPI.js" type="text/javascript"></script>
	<!-- midi.js package -->
	<script src="midi-js/js/midi/audioDetect.js" type="text/javascript"></script>
	<script src="midi-js/js/midi/gm.js" type="text/javascript"></script>
	<script src="midi-js/js/midi/loader.js" type="text/javascript"></script>
	<script src="midi-js/js/midi/plugin.audiotag.js" type="text/javascript"></script>
	<script src="midi-js/js/midi/plugin.webaudio.js" type="text/javascript"></script>
	<script src="midi-js/js/midi/plugin.webmidi.js" type="text/javascript"></script>
	<!-- utils -->
	<script src="midi-js/js/util/dom_request_xhr.js" type="text/javascript"></script>
	<script src="midi-js/js/util/dom_request_script.js" type="text/javascript"></script>

	<!-- vue.js -->
	<script src="node_modules\vue\dist\vue.js"></script>

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.css">

	<style>
		#app {
			max-width: 970px;
		}
	</style>
</head>

<body>
	<div id="app" class="container px-4">
		<div class="row">
			<h1>MIDI Scales Player</h1>
		</div>
		<div class="row mt-3">
			<label for="root-note-select">Root note:</label>
			<select id="root-note-select" v-model="selectedRootNote" @change="stop" class="form-control">
				<option v-for="rootNote in rootNotes" v-bind:value="rootNote">
					{{ rootNote.name }}
				</option>
			</select>
		</div>
		<div class="row mt-3">
			<label for="octave-select">Number of octaves:</label>
			<select id="octave-select" v-model="selectedNumberOfOctaves" @change="stop" class="form-control">
				<option v-for="octave in octavesList" v-bind:value="octave">
					{{ octave }}
				</option>
			</select>
		</div>
		<div class="row mt-3">
			<label for="scale-select">Scale:</label>
			<select id="scale-select" v-model="selectedScaleIntervals" @change="stop" class="form-control">
				<option v-for="scaleInterval in scaleIntervalsList" v-bind:value="scaleInterval.intervals">
					{{ scaleInterval.name }}
				</option>
			</select>
		</div>
		<div class="row mt-3">
			<label for="bpm-input">Tempo:</label>
			<input id="bpm-input" type="range" min="25" max="200" v-model="bpm" class="form-control" />
			<span class="form-control text-center">{{ bpm }} BPM</span>
		</div>
		<div class="row mt-3">
			<div class="form-check form-check-inline">
				<input id="degrees-check" type="checkbox" v-model="showDegrees" class="form-check-input"/>
				<label for="degrees-check" class="form-check-label">Show scale degrees</label>
			</div>
		</div>

		<div class="row mt-4">
			<button type="button" class="btn btn-primary btn-block" v-if="!running" v-on:click="start">Start</button>
			<button type="button" class="btn btn-primary btn-block" v-if="running" v-on:click="stop">Stop</button>
		</div>

		<div class="row no-gutters" v-if="showDegrees">
			<div v-for="note in degrees" class="col">
				<div class="card mx-1 mt-3 note text-white" v-bind:class="{ 'bg-secondary': !note.active, 'bg-success': note.active }" v-on:click="playSingleNote(note)">
					<div class="card-body">
						<h4 class="card-title text-center">{{ note.degree }}</h4>
						<p class="card-text text-center">{{ note.name }}</p>
					</div>
				</div>
			</div>
		</div>

		<ul v-for="note in playedNotes" v-if="!running" class="mt-4">
			<li>Degree: {{ note.degree }} - Name: {{ note.name }}</li>
		</ul>
	</div>

	<script src="midi-scales-player.js"></script>
	<script type="text/javascript">
		var volume = 200;
		var bpm = 40;
		var velocity = 127;
		player.init({
			volume: volume,
			bpm: bpm,
			velocity: velocity
		});
	</script>
</body>

</html>
