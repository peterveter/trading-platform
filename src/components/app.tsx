import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "../lib/api";
import { MetricsChartsSection } from "./metrics-charts-section";
import { StatsSection } from "./stats-section";
import { Button } from "./ui/button";
import { MetricsSummarySection } from "./metrics-summary-section";
import { OrderEntryPanelSection } from "./order-entry-panel-section";

export function App() {
  return (
    <div className="min-h-screen w-full h-full">
      <div className="container">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div className="text-center text-white space-y-4 p-4">
                  <p>There was an error!</p>
                  <Button
                    variant="outline"
                    onClick={() => resetErrorBoundary()}
                  >
                    Try again
                  </Button>
                </div>
              )}
            >
              <QueryClientProvider client={queryClient}>
                <div className="grid gap-10 pb-10">
                  <StatsSection />
                  <MetricsSummarySection />
                  <div className="w-9/12 aspect-[16/9]">
                    <MetricsChartsSection />
                  </div>
                  <OrderEntryPanelSection />
                </div>
              </QueryClientProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}
