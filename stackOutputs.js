import CloudFormation from "aws-sdk/clients/cloudformation.js";

const region = "eu-north-1";
const stackName = "KuumatKinkut";

export async function getStackExports(
  { stackName, region },
  byOutputKey = false
) {
  const cloudformation = new CloudFormation({
    apiVersion: "2010-05-15",
    region: "eu-north-1",
  });
  const exportsList = {};
  const result = await cloudformation
    .describeStacks({ StackName: stackName })
    .promise();
  const foundStacks = (result && result.Stacks) || [];
  const stack = foundStacks.find((s) => s.StackName === stackName);
  if (!stack) {
    throw new Error(
      `Unable to find stack "${stackName}" in region "${region}"`
    );
  }

  stack.Outputs.forEach(({ OutputKey, ExportName, OutputValue }) => {
    exportsList[byOutputKey ? OutputKey : ExportName] = OutputValue;
  });
  return Object.values(exportsList)[0];
}

//console.log(await getStackExports({ stackName, region }));
