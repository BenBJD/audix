# Audix
Some sort of beat making app with collaberation and probably some social media?
Maybe like an ableton app but with a massive crowdsourced sample library and easier to use for beginners

## Implementation
- Sample library
- Audio engine
- Synthesizer
- Sampler
- Sequencer/drum machine
- MIDI
- Microphone and other inputs
- Effects
- Users and auth
- Making a song

## Sample library
- When a new sample is uploaded, the following need to be found
- Tempo
- Key (If applicable)
- Energy
- Length
- Waveform image
- All should be added to database with any other information or tags given by the use
- A rating system, maybe other metrics would help UX
- Mongo might work well here as there shouldnt really need to be relations
- TODO: Think about whether samples could also just be a midi clip with data such as which instrument and control values

## Audio engine
- Gonna be difficult
- Make a low latency audio engine that preferably doesnt do anything weird
- Needs to be able to play and record raw data from many sources
- Does it need to handle putting all the different sources together?

## Synthesiser
- Not sure what exactly to do here
- Keeping it modular would probably make it easier to make and fun to use
- So like make a vco, vcf, mixer, envelopes that are independant and can be reused
- Or maybe like a not modular fm synth or something? gonna require some research cos i want it to be relatively multi-use not just a boring mono synth

## Sampler
- Ability to receive audio from microphone, aux input, in built instruments, audio files
- Records them into clips
- Some info can be calculated, some can be given by the user
- When played, samples can be changed in pitch, tempo, could be reversed or something idk like normal sample stuff

## Sequencer
- Using a global clock, run a reliable 16 or something step sequencer
- Can be used for notes and control of instruments
- Can be used as a drum machine (with some preset beats?)
- Any sample could be played through it

## MIDI
- MIDI clips can be made to control instruments
- MIDI files can be opened
- Basically just do the whole MIDI thing properly

## Microphone and other inputs
- Ability to record from microphone and headphone jack
- Open audio files
- Open MIDI files

## Effects
- Basic amp and pedals for a guitar input
- Normal studio effects like reverb and filters cos everyone loves that shit

## Users and auth
- All the normal user and auth shit

## Making a song
- Uses a similar system to ableton with clips for each track you can trigger
- Each clip is a sample of audio or a midi file (which itself could be from the sequencer or made by the user)
- Needs to keep track of global things such as tempo and keep a clock for instruments, sequencer etc. to use
- Maybe an arrangement view that just automatically triggers clips
- Can be exported to mp3 probs
- A user can record themselves making a song and upload it to do the whole short video thing all the kids love

# So how to do this
- Build the synthesiser, sequencer (and midi) and sound engine till there is a few midi clips that can be played
- The app will be in react native, using as much javascript as possible but probably gonna have to drop to java and c++ for actual sound making stuff
