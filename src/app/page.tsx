import { Grid } from "@/components/Grid";
import { randomizeGrid } from "@/logic/cgol";

const initialGrid = randomizeGrid();

export default function Home() {
  return <Grid initialGrid={initialGrid} />;
}
