import dotenv from "dotenv";
import {
  AgentExecutionStatus,
  Payments,
  EnvironmentName,
} from "@nevermined-io/payments";

dotenv.config();

const NVM_API_KEY = process.env.NVM_API_KEY!;
const NVM_ENVIRONMENT = process.env.NVM_ENVIRONMENT!;
const AGENT_DID = process.env.AGENT_DID!;

let payments: Payments;

/**
 * This function is called when a step-updated event is received.
 *
 * @param data
 * @returns void
 */
async function run(data: any) {
  const eventData = JSON.parse(data);
  const step = await payments.query.getStep(eventData.step_id);
  if (step.step_status !== AgentExecutionStatus.Pending) {
    return;
  }

  //DO OUR STUFF

  // Update the step with the result
  await payments.query.updateStep(step.did, {
    ...step,
    step_status: AgentExecutionStatus.Completed,
    is_last: true,
    output: "Task executed successfully",
  });
}
/**
 * Initializes the Payments instance.
 * @param nvmApiKey - Nevermined API Key.
 * @param environment - Nevermined environment (e.g., 'staging').
 * @returns A Payments instance.
 */
function initializePayments(nvmApiKey: string, environment: string): Payments {
  const paymentsInstance = Payments.getInstance({
    nvmApiKey,
    environment: environment as EnvironmentName,
  });

  if (!paymentsInstance.isLoggedIn) {
    throw new Error("Failed to login to Nevermined Payments Library");
  }
  return paymentsInstance;
}

/**
 * Main function.
 */
async function main() {
  try {
    payments = initializePayments(NVM_API_KEY, NVM_ENVIRONMENT);

    const opts = {
      joinAccountRoom: false,
      joinAgentRooms: [AGENT_DID],
      subscribeEventTypes: ["step-updated"],
      getPendingEventsOnSubscribe: false,
    };

    await payments.query.subscribe(run, opts);
  } catch (error) {
    payments.query.disconnect();
    process.exit(1);
  }
}

main();
