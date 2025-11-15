import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ruler, Save } from 'lucide-react';
import type { Measurements } from '@/types';

interface MeasurementFormProps {
  measurements: Measurements;
  onSubmit: (measurements: Measurements) => void;
  onCancel?: () => void;
}

const measurementFields = [
  { key: 'bust' as keyof Measurements, label: 'Bust', unit: 'inches' },
  { key: 'waist' as keyof Measurements, label: 'Waist', unit: 'inches' },
  { key: 'shoulderToWaist' as keyof Measurements, label: 'Shoulder to Waist', unit: 'inches' },
  { key: 'shoulderToHip' as keyof Measurements, label: 'Shoulder to Hip', unit: 'inches' },
  { key: 'hip' as keyof Measurements, label: 'Hip', unit: 'inches' },
  { key: 'shoulderToNipple' as keyof Measurements, label: 'Shoulder to Nipple', unit: 'inches' },
  { key: 'nippleToNipple' as keyof Measurements, label: 'Nipple to Nipple', unit: 'inches' },
  { key: 'napeWaist' as keyof Measurements, label: 'Nape- Waist(Back)', unit: 'inches' },
  { key: 'underBurst' as keyof Measurements, label: 'Under Bust', unit: 'inches' },
  { key: 'shoulderUnderBust' as keyof Measurements, label: 'Shoulder- Under Bust', unit: 'inches' },
  { key: 'acrossChest' as keyof Measurements, label: 'Across Chest', unit: 'inches' },
  { key: 'acossBack' as keyof Measurements, label: 'Across Back', unit: 'inches' },
  { key: 'dressLength' as keyof Measurements, label: 'Dress Length', unit: 'inches' },
  { key: 'kabaLength' as keyof Measurements, label: 'Kaba Length', unit: 'inches' },
  { key: 'skirtLength' as keyof Measurements, label: 'Skirt Length', unit: 'inches' },
  { key: 'slitLength' as keyof Measurements, label: 'Slit Length', unit: 'inches' },
  { key: 'sleeveLength' as keyof Measurements, label: 'Sleeve Length', unit: 'inches' },
  { key: 'aroundArm' as keyof Measurements, label: 'Around Arm', unit: 'inches' },
  { key: 'fullLength' as keyof Measurements, label: 'Full Length', unit: 'inches' },
];

export function MeasurementForm({ measurements, onSubmit, onCancel }: MeasurementFormProps) {
  const [formData, setFormData] = useState<Measurements>(measurements);

  useEffect(() => {
    setFormData(measurements);
  }, [measurements]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateMeasurement = (key: keyof Measurements, value: string) => {
    setFormData({
      ...formData,
      [key]: value === '' ? undefined : parseFloat(value),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-primary" />
          Measurements
        </CardTitle>
        <CardDescription>Enter all measurements in inches</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {measurementFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>
                  {field.label} <span className="text-muted-foreground text-xs">({field.unit})</span>
                </Label>
                <Input
                  id={field.key}
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData[field.key] || ''}
                  onChange={(e) => updateMeasurement(field.key, e.target.value)}
                  placeholder="0.0"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            )}
              <Button type="submit" className="flex items-center mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Save className="h-4 w-4 mr-2" />
                Save Measurements
              </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

