
export async function parentTree(arr: any) {


  var arr1:[] = findObjects(arr.resource_spans,'spans');
  // coloca todos os spans em um unico array
  const flattenedArray = arr1.flat(Infinity);
  // coloca o span root em primeiro lugar do array
  const index = flattenedArray.findIndex( (obj:any) => !obj.parent_span_id);
  if (index !== -1) {
  const obj = flattenedArray.splice(index, 1)[0];
  flattenedArray.unshift(obj);
  }

  const sortedSpans = await sortSpans(flattenedArray);
  const max = await findTimeRange(sortedSpans);
  return { y:sortedSpans, max:max};

}


function findObjects(obj:any, key:any) {
  let foundObjects:any = [];
  for (let k in obj) {
    if (k === key) {
      foundObjects.push(obj[k]);
    } else if (typeof obj[k] === 'object') {
      foundObjects = foundObjects.concat(findObjects(obj[k], key));
    }
  }
  return foundObjects;
}

async function sortSpans(spans: any) {
  const sortedSpans:any = [];

  // Cria um mapa para armazenar os spans por span_id
  const spanMap = new Map<number, any>();

  // Preenche o mapa com os spans
  for (const span of spans) {
    spanMap.set(span.span_id, span);
  }

  // Função recursiva para percorrer os spans
  function traverse(span: any) {
    let duration = (span.end_time_unix_nano / 1000000 - span.start_time_unix_nano / 1000000).toFixed(2);
    sortedSpans.push({...span,duration,show:span});

    // Obtém os filhos do span atual
    const children = spans.filter((s:any) => s.parent_span_id === span.span_id);

    // Ordena os filhos com base no span_id
    children.sort((a:any, b:any) => a.span_id - b.span_id);

    // Percorre os filhos recursivamente
    for (const child of children) {
      traverse(child);
    }
  }

  // Obtém os spans raiz (parent_span_id nulo)
  const rootSpans = spans.filter((span:any) => !span.parent_span_id);

  // Ordena os spans raiz com base no start_time_unix_nano
  rootSpans.sort((a:any, b:any) => a.start_time_unix_nano - b.start_time_unix_nano);

  // Percorre os spans raiz e seus descendentes
  for (const span of rootSpans) {
    traverse(span);
  }

  return sortedSpans;
}

async function findTimeRange(array: any[]) {
  let minStartTime = Infinity;
  let maxEndTime = -Infinity;

  for (const item of array) {
    const { start_time_unix_nano, end_time_unix_nano } = item;

    if (start_time_unix_nano < minStartTime) {
      minStartTime = start_time_unix_nano;
    }

    if (end_time_unix_nano > maxEndTime) {
      maxEndTime = end_time_unix_nano;
    }
  }

  return maxEndTime / 1000000 - minStartTime / 1000000;
}
