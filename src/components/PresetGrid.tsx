import React from 'react';

interface PresetGridProps {
    currentPreset: number;
    onSelectPreset: (preset: number) => void;
    isConnected: boolean;
}

class PresetGroup {
    public startIndex: number;
    public endIndex: number;
    public caption: string;
    public presets: Preset[];

    constructor(startIndex: number, endIndex: number, caption: string) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.caption = caption;

        this.presets = new Array<Preset>(4);
        let fakeIndex = 0;
        for (let i = startIndex; i <= endIndex; i++) {
            let preset = new Preset(i, fakeIndex);
            this.presets.push(preset);
            fakeIndex++;
        }
    }
}

class Preset {
    public index: number;
    public fakeIndex: number;
    public caption: string;

    constructor(index: number, fakeIndex: number) {
        this.index = index;
        this.fakeIndex = fakeIndex;
        
        this.caption = "";
        switch (fakeIndex) {
            case 1:
                this.caption = "Edge";
                break;
            case 2:
                this.caption = "Crunch";
                break;
            case 3:
                this.caption = "Overdrive";
                break;
            default:
                this.caption = "Clean";
        }
    }
}

export const PresetGrid: React.FC<PresetGridProps> = ({ currentPreset, onSelectPreset, isConnected }) => {

    const presetGroups: PresetGroup[] = [
        new PresetGroup(0, 3, 'UAFX Pedals'),
        new PresetGroup(4, 7, 'Matcheless Spit'),
        new PresetGroup(8, 11, 'Fender Vibroverb'),
        new PresetGroup(12, 15, 'Matchless SC30'),
        new PresetGroup(16, 19, 'Dumble Tweed'),
        new PresetGroup(20, 23, 'Fender Pro'),
        new PresetGroup(24, 27, 'Vox AC30'),
    ];

    const handlePrev = () => {
        onSelectPreset(Math.max(0, currentPreset - 1));
    };

    const handleNext = () => {
        onSelectPreset(Math.min(63, currentPreset + 1));
    };

    return (
        <div className="section-card">
            <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-neural-n100">
                Presets Disponíveis
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 lg:grid-cols-5 ">
                <button
                    className="btn-quick"
                    onClick={handlePrev}
                    disabled={!isConnected || currentPreset === 0}
                >
                    <span className="inline-block mr-2">←</span> Previous
                </button>
                <button
                    className="btn-quick"
                    onClick={handleNext}
                    disabled={!isConnected || currentPreset === 63}
                >
                    Next <span className="inline-block ml-2">→</span>
                </button>
            </div>
            {presetGroups.map((presetGroup) => (
                <div className="section-card">
                    <div className="mb-8">
                        <h3 className="mb-3 text-lg font-semibold text-neural-n90">{presetGroup.caption}</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {presetGroup.presets.map((preset) => (
                                <button
                                    key={preset.index}
                                    className={`btn-preset ${currentPreset === preset.index ? 'active' : ''}`}
                                    onClick={() => onSelectPreset(preset.index)}
                                    disabled={!isConnected}
                                >
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-bold">{preset.caption}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};