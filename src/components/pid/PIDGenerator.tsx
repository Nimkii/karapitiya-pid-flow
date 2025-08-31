import { useState } from 'react';
import { Copy, RefreshCw, QrCode, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generatePID, EXAMPLE_PID, generatePIDQRData } from '@/lib/pid';
import { useToast } from '@/hooks/use-toast';

interface PIDGeneratorProps {
  onPIDGenerated?: (pid: string) => void;
  showExample?: boolean;
}

export function PIDGenerator({ onPIDGenerated, showExample = true }: PIDGeneratorProps) {
  const [generatedPID, setGeneratedPID] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePID = () => {
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const { pid } = generatePID();
      setGeneratedPID(pid);
      setIsGenerating(false);
      
      onPIDGenerated?.(pid);
      
      toast({
        title: 'PID Generated Successfully',
        description: `New Patient ID: ${pid}`,
      });
    }, 500);
  };

  const handleCopyPID = async (pid: string) => {
    try {
      await navigator.clipboard.writeText(pid);
      toast({
        title: 'PID Copied',
        description: 'Patient ID copied to clipboard',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Unable to copy PID to clipboard',
      });
    }
  };

  const handlePrintWristband = (pid: string) => {
    toast({
      title: 'Print Initiated',
      description: `Printing wristband for ${pid}`,
    });
    // In production, this would trigger the printer API
  };

  const PIDDisplay = ({ pid, title, isNew = false }: { pid: string; title: string; isNew?: boolean }) => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="text-2xl font-mono font-bold text-primary bg-primary/5 rounded-lg p-4 border border-primary/20">
          {pid}
        </div>
        {isNew && (
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Newly Generated
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPID(pid)}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy PID
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <QrCode className="h-4 w-4" />
          Show QR
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePrintWristband(pid)}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Wristband
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {showExample && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">PID Format Example</CardTitle>
            <CardDescription>
              Karapitiya Teaching Hospital Patient ID Format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Badge variant="outline">KTH</Badge>
              <span className="text-muted-foreground">-</span>
              <Badge variant="outline">25</Badge>
              <Badge variant="outline">08</Badge>
              <span className="text-muted-foreground">-</span>
              <Badge variant="outline">00073</Badge>
              <span className="text-muted-foreground">-</span>
              <Badge variant="outline">6</Badge>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground mt-2">
              <span>Site</span>
              <span>•</span>
              <span>Year</span>
              <span>Month</span>
              <span>•</span>
              <span>Sequence</span>
              <span>•</span>
              <span>Check</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Generate Patient ID</CardTitle>
          <CardDescription>
            Create a unique Patient ID (PID) for the new patient
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!generatedPID ? (
            <div className="text-center">
              <Button
                onClick={handleGeneratePID}
                disabled={isGenerating}
                size="lg"
                className="w-full max-w-sm"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating PID...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New PID
                  </>
                )}
              </Button>
              
              {showExample && (
                <>
                  <Separator className="my-4" />
                  <div className="text-sm text-muted-foreground">
                    Example format: <code className="text-primary">{EXAMPLE_PID}</code>
                  </div>
                </>
              )}
            </div>
          ) : (
            <PIDDisplay pid={generatedPID} title="Generated PID" isNew />
          )}
        </CardContent>
      </Card>
    </div>
  );
}