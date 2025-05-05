import { getVercelOidcToken } from '@vercel/functions/oidc';
import { ExternalAccountClient } from 'google-auth-library';
import { createVertex } from '@ai-sdk/google-vertex';
import { generateText } from 'ai';

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID!;
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER!;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL!;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID!;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID!;

export const POST = async (req: Request) => {
    try {
      const { prompt } = await req.json();
  
      console.log("Received prompt:", prompt);
  
      const authClient = ExternalAccountClient.fromJSON({
        type: 'external_account',
        audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        token_url: 'https://sts.googleapis.com/v1/token',
        service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
        subject_token_supplier: {
          getSubjectToken: getVercelOidcToken,
        },
      })!;
  
      console.log("Auth client created.");
  
      const vertex = createVertex({
        project: GCP_PROJECT_ID,
        location: 'us-central1',
        googleAuthOptions: {
          authClient,
          projectId: GCP_PROJECT_ID,
        },
      });
  
      console.log("Vertex instance created.");
  
      const result = await generateText({
        model: vertex('gemini-1.5-flash'),
        prompt: prompt || 'Say something nice.',
      });
  
      console.log("Text generated:", result);
  
      return Response.json({ result });
  
    } catch (error: unknown) {
      console.error("ERROR in /api/gcp-vertex-ai:", error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      return Response.json({ error: errorMessage }, { status: 500 });
    }
  };
  