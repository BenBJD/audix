# Audix
Ok so pivoting. Now there will be a device e.g a pc which runs the main software in a browser, and then people can use their phones to play instruments. A collaborative band app thing idk. Should be a bit easier and probably actually better

No more users and auth, no more sample library and some pther stuff probably. Saving clips and songs could be done in future but not now.

## Implementation

### Main device (PC)
- Audio engine (Now browser based)
- Clock
- Websocket API so other devices can connect

### Child devices (Phones)
- Synthesizer
- Sampler (low priority)
- Sequencer/drum machine
- Microphone and other inputs
- Effects
- Should basically just be controls for stuff in the main pc, so I dont need to make a synth engine on android

## Audio engine
- Browser based audio should be much easier
- Needs to keep a clock also that somehow keeps in time witt child devices and with minimal latency
- Mixes sources and outputs them, no inputs

## Synthesiser
- Not sure what exactly to do here
- Can be its own seperate thing
- Keeping it modular would probably make it easier to make and fun to use
- So like make a vco, vcf, mixer, envelopes that are independant and can be reused
- Or maybe like a not modular fm synth or something? gonna require some research cos i want it to be relatively multi-use not just a boring mono synth
- Seperate bass synth with a sequencer and lead poly synth could be done?

## Sequencer
- Using the master clock, run a reliable 16 or something step sequencer
- Can be used for control of bass synth and drum machine

## Microphone and other inputs
- Microphone can be used as an input, live streaming to the main pc
- Guitar or other instruments and vocals could all be used

## Effects
- Basic amp and pedals for a guitar input
- Normal studio effects like reverb and filters cos everyone loves that shit

## So how to do this
- Build the sound engine and stuff to run in node
- Make the React based web interface for the main device
- Make a synth, sequencer, and drum machine to run in node
- Make a react native app that can control everything e.g. frontend for the instruments and play/pause
