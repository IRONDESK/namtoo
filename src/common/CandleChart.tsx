"use client";
import React, { useMemo } from "react";
import { StockOHLC, StockOHLCList } from "@/types/stock";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  LineSeries,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";

interface Props {
  chartData: StockOHLCList;
  width: number;
  height: number;
  ratio?: number;
}
function CandleChart({ chartData = [], width, height, ratio = 3 }: Props) {
  const margin = { left: 0, right: 52, top: 12, bottom: 10 };

  const formattedNumber = (value: number, digits: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  };

  const pricesDisplayFormat = (value: number) => formattedNumber(value, 2);
  const volumePriceDisplayFormat = (value: number) => {
    if (value < 1000) {
      return formattedNumber(value, 0);
    } else if (value < 1000000) {
      return formattedNumber(value / 1000, 0) + "K";
    } else if (value < 1000000000) {
      return formattedNumber(value / 1000000, 0) + "M";
    } else {
      return formattedNumber(value / 1000000000, 0) + "B";
    }
  };

  const ema12 = useMemo(
    () =>
      ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d: { ema12: number }, c: number) => {
          d.ema12 = c;
        })
        .accessor((d: { ema12: number }) => d.ema12),
    []
  );

  const ema26 = useMemo(
    () =>
      ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d: { ema26: number }, c: number) => {
          d.ema26 = c;
        })
        .accessor((d: { ema26: number }) => d.ema26),
    []
  );

  const elder = useMemo(() => elderRay(), []);

  const calculatedData = useMemo(() => {
    if (chartData) {
      return elder(ema26(ema12(chartData)));
    }
    return [];
  }, [chartData, ema12, ema26, elder]);

  const xScaleProvider = useMemo(() => discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date), []);

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData ?? []);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;

  const timeDisplayFormat = (item: string) => {
    return new Date(item).toISOString().split("T")[0];
  };

  const barChartExtents = (data: StockOHLC) => data.volume * 1.2;
  const candleChartExtents = (data: StockOHLC) => [data.high + 3, data.low - 2];
  const yEdgeIndicator = (data: StockOHLC) => data.close;
  const volumeSeries = (data: StockOHLC) => data.volume;
  const openCloseColor = (data: StockOHLC) => (data.close > data.open ? "#1c6bff" : "#ef5350");

  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines strokeStyle="#d8d8d8" strokeWidth={2} showTicks={false} showTickLabel={false} />
        <YAxis
          showGridLines
          strokeStyle="#efefef"
          tickFormat={pricesDisplayFormat}
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
        />
        <CandlestickSeries width={5} fill={openCloseColor} wickStroke={openCloseColor} />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
        />
        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} fontFamily={`'fontPretendard', 'fontPretendard Fallback'`} />
      </Chart>
      <Chart id={2} height={elderRayHeight / 1.5} origin={elderRayOrigin} yExtents={barChartExtents}>
        <BarSeries fillStyle={openCloseColor} yAccessor={volumeSeries} />
        <XAxis
          showDomain={true}
          showGridLines
          strokeStyle="#d8d8d8"
          strokeWidth={2}
          gridLinesStrokeStyle="#efefef"
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
          tickFormat={(value) => {
            const index = value as number;
            const tickDate = chartData[index].date as Date;
            const prevTickDate = chartData[index - 1].date as Date;

            if (prevTickDate.getFullYear() < tickDate.getFullYear()) {
              return tickDate.getFullYear().toString() + "년";
            }
            return `${tickDate.getMonth() + 1}월 ${tickDate.getDate()}일`;
          }}
        />
        <YAxis
          showGridLines
          strokeStyle=""
          tickFormat={volumePriceDisplayFormat}
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
        />
        <MouseCoordinateX
          displayFormat={timeDisplayFormat}
          fontFamily={`'fontPretendard', 'fontPretendard Fallback'`}
        />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={volumePriceDisplayFormat} />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
}

export default CandleChart;
